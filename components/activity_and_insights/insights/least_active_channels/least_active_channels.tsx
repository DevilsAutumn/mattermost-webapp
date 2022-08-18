// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {memo, useState, useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getMyLeastActiveChannels, getLeastActiveChannelsForTeam} from 'mattermost-redux/actions/insights';

import {getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';

import {LeastActiveChannel} from '@mattermost/types/insights';

import {InsightsScopes} from 'utils/constants';

import TitleLoader from '../skeleton_loader/title_loader/title_loader';
import CircleLoader from '../skeleton_loader/circle_loader/circle_loader';
import widgetHoc, {WidgetHocProps} from '../widget_hoc/widget_hoc';
import WidgetEmptyState from '../widget_empty_state/widget_empty_state';

import LeastActiveChannelsItem from './least_active_channels_item/least_active_channels_item';

import './../../activity_and_insights.scss';

const LeastActiveChannels = (props: WidgetHocProps) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [leastActiveChannels, setLeastActiveChannels] = useState([] as LeastActiveChannel[]);

    const currentTeamId = useSelector(getCurrentTeamId);

    const getInactiveChannels = useCallback(async () => {
        setLoading(true);
        if (props.filterType === InsightsScopes.TEAM) {
            const data: any = await dispatch(getLeastActiveChannelsForTeam(currentTeamId, 0, 3, props.timeFrame));
            if (data.data?.items) {
                setLeastActiveChannels(data.data.items);
            }
        } else {
            const data: any = await dispatch(getMyLeastActiveChannels(currentTeamId, 0, 3, props.timeFrame));
            if (data.data?.items) {
                setLeastActiveChannels(data.data.items);
            }
        }
        setLoading(false);
    }, [props.timeFrame, currentTeamId, props.filterType]);

    useEffect(() => {
        getInactiveChannels();
    }, [getInactiveChannels]);

    const skeletonLoader = useMemo(() => {
        const entries = [];
        for (let i = 0; i < 4; i++) {
            entries.push(
                <div
                    className='least-active-channels-loading-container'
                    key={i}
                >
                    <CircleLoader
                        size={16}
                    />
                    <TitleLoader/>
                    <TitleLoader/>
                    <TitleLoader/>
                </div>,
            );
        }
        return entries;
    }, []);

    const getListItems = useCallback(() => {
        return (
            leastActiveChannels.map((channel, i) => {
                return (
                    <LeastActiveChannelsItem
                        channel={channel}
                        key={i}
                        actionCallback={getInactiveChannels}
                    />
                );
            })
        );
    }, [leastActiveChannels]);

    return (
        <div className='least-active-channels-container'>
            {
                loading &&
                skeletonLoader
            }
            {
                (leastActiveChannels && !loading) &&
                <div className='channel-list'>
                    {getListItems()}
                </div>
            }
            {

                (leastActiveChannels.length === 0 && !loading) &&
                <WidgetEmptyState
                    icon={'globe'}
                />
            }
        </div>
    );
};

export default memo(widgetHoc(LeastActiveChannels));
