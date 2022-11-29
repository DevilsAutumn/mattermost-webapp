// storybook canvas- & docs-pages style overrides
import React, { useEffect, useState } from 'react';
import {createTheme} from '@mui/material/styles';
import {GlobalStyles} from '@mui/material';

import ThemeProvider from '../src/themeprovider/themeprovider';

const CanvasThemeProvider = ({children = null, theme = {}}): JSX.Element => {
    const [selectedTheme, setSelectedTheme] = useState(createTheme(theme));

    useEffect(() => {
        setSelectedTheme(createTheme(theme));
    }, [theme]);

    const canvasStyles = {
        'html': {
            fontSize: 10,
        },

        'body.sb-show-main.sb-main-centered': {
            backgroundColor: selectedTheme.palette.background.default,
            alignItems: 'stretch',

            '#root': {
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        }
    };

    const globalStyles = <GlobalStyles styles={canvasStyles}/>

    return (
        <ThemeProvider theme={selectedTheme}>
            {globalStyles}
            {children}
        </ThemeProvider>
    );
};

const DocumentationThemeProvider = ({children = null, theme = {}}): JSX.Element => {
    const selectedTheme = createTheme(theme);

    const docStyles = {
        'html': {
            fontSize: 10,
        },

        'body.sb-show-main': {
            backgroundColor: selectedTheme.palette.background.default,
            alignItems: 'stretch',

            '.sbdocs-wrapper': {
                backgroundColor: selectedTheme.palette.mode === 'dark' ? 'transparent' : selectedTheme.palette.background.default,

                'td': {
                    backgroundColor: selectedTheme.palette.mode === 'dark' ? selectedTheme.palette.background.paper : '#FFF',
                },

                'hr': {
                    borderTop: '1px solid rgba(0, 0, 0, 0.25)',
                }
            }
        }
    };

    const globalStyles = <GlobalStyles styles={docStyles}/>

    return (
        <ThemeProvider theme={selectedTheme}>
            {globalStyles}
            {children}
        </ThemeProvider>
    );
};

export { CanvasThemeProvider, DocumentationThemeProvider };
