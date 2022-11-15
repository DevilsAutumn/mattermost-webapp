// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {PostMetadata} from './posts';

export type Draft = {
    create_at: number;
    update_at: number;
    delete_at: number;
    user_id: string;
    channel_id: string;
    root_id: string;
    message: string;
    props: Record<string, any>;
    file_ids?: string[];
    metadata?: PostMetadata;
    deleted_file_ids?: string[];
};
