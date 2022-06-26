// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {useState} from 'react';
import {DefaultNodeModel, DiagramEngine} from '@projectstorm/react-diagrams';

import {generateId} from 'utils/utils';

type Props = {
    children?: React.ReactNode;
    engine: DiagramEngine;
}

const SystembusCanvasWidget = ({children, engine}: Props): JSX.Element => {
    const [forceUpdate, setForceUpdate] = useState<number>(0);
    return (
        <div
            className='systembus__ctr'
            onDrop={(event) => {
                const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
                console.log('Dropping object', data);
                const node: DefaultNodeModel = new DefaultNodeModel({id: generateId(), ...data});
                if (data.nodeType === 'event') {
                    node.addOutPort('out');
                } else if (data.nodeType === 'action') {
                    node.addInPort('in');
                    node.addOutPort('out');
                } else if (data.nodeType === 'slash-command') {
                    // TODO: ask for the slash command information and generate the right outputs
                    node.addOutPort('main');
                } else if (data.nodeType === 'webhook') {
                    node.addOutPort('out');
                } else if (data.nodeType === 'flow') {
                    if (data.name == "if") {
                        // TODO: ask for the if condition and check value
                        node.addInPort('in');
                        node.addOutPort('then');
                        node.addOutPort('else');
                    } else if (data.name == "switch") {
                        node.addInPort('in');
                        // TODO: make this dynamic by asking the cases
                        node.addOutPort('case 1');
                        node.addOutPort('case 2');
                        node.addOutPort('case 3');
                    } else if (data.name == "random") {
                        node.addInPort('in');
                        // TODO: make this dynamic by asking the number of outputs
                        node.addOutPort('out-1');
                        node.addOutPort('out-2');
                        node.addOutPort('out-3');
                    }
                }
                const point = engine.getRelativeMousePoint(event);
                node.setPosition(point);
                engine.getModel().addNode(node);
                setForceUpdate(forceUpdate + 1);
            }}
        >
            {children}
        </div>
    );
};

export default SystembusCanvasWidget;
