// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import path from 'path';
import {expect} from '@playwright/test';

import {PreferenceType} from '@mattermost/types/preferences';

import testConfig from '@e2e-test.config';

import {makeClient} from '.';
import {getOnPremServerConfig} from './default_config';
import {createRandomTeam} from './team';
import {createRandomUser} from './user';

export async function initSetup({
    userPrefix = 'user',
    teamPrefix = {name: 'team', displayName: 'Team'},
    withDefaultProfileImage = true,
} = {}) {
    try {
        const {adminClient, adminUser} = await getAdminClient();
        if (!adminClient) {
            throw new Error(
                "Failed to setup admin: Check that you're able to access the server using the same admin credential."
            );
        }

        const adminConfig = await adminClient.updateConfig(getOnPremServerConfig());

        const team = await adminClient.createTeam(createRandomTeam(teamPrefix.name, teamPrefix.displayName));

        const randomUser = createRandomUser(userPrefix);
        const user = await adminClient.createUser(randomUser, '', '');
        user.password = randomUser.password;

        await adminClient.addToTeam(team.id, user.id);

        const {client: userClient} = await makeClient(user);
        if (!userClient) {
            throw new Error(
                "Failed to setup user: Check that you're able to access the server using the same credential for user"
            );
        }

        if (withDefaultProfileImage) {
            const fullPath = path.join(path.resolve(__dirname), '../', 'fixtures/mattermost-icon_128x128.png');
            await userClient.uploadProfileImageX(user.id, fullPath);
        }

        const preferences: PreferenceType[] = [
            {user_id: user.id, category: 'tutorial_step', name: user.id, value: '999'},
        ];
        await userClient.savePreferences(user.id, preferences);

        return {
            adminClient,
            adminUser,
            adminConfig,
            user,
            userClient,
            team,
            offTopicUrl: getUrl(team.name, 'off-topic'),
            townSquareUrl: getUrl(team.name, 'town-square'),
        };
    } catch (err) {
        // log an error for debugging
        // eslint-disable-next-line no-console
        console.log(err);
        expect(err, 'Should not throw an error').toBeFalsy();
        throw err;
    }
}

export async function getAdminClient() {
    const {
        client: adminClient,
        user: adminUser,
        err,
    } = await makeClient({
        username: testConfig.adminUsername,
        password: testConfig.adminPassword,
    });

    return {adminClient, adminUser, err};
}

function getUrl(teamName: string, channelName: string) {
    return `/${teamName}/channels/${channelName}`;
}
