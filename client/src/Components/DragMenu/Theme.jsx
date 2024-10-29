import PropTypes from 'prop-types';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Tooltip,
    // Icon,
} from '@chakra-ui/react';
import { THEMES } from '../../Conts/Themes';

const getThemeColors = (theme) => {
    // Define your theme color mapping
    const themeColors = {
        'hc-black': {
            textColor: '#fff',
            selectedBg: 'grey.900',
            hoverBg: '#333'
        },
        // Add more theme color mappings here
    };

    return themeColors[theme] || themeColors['hc-black']; // Default to 'vs-light'
};

function Theme({ theme, onSelectTheme }) {
    const themes = Object.entries(THEMES);
    const { textColor, selectedBg, hoverBg } = getThemeColors(theme);

    return (
        <Menu isLazy>
            <Tooltip hasArrow arrowSize={10} placement='top-start' label='Change the Theme' fontSize='xs' >
                <MenuButton
                    as={Button}
                    colorScheme="teal"
                    variant="solid"
                    size="sm"
                    borderRadius="md"
                    fontSize="lg"
                    _hover={{ bg: 'teal.700' }}
                    _active={{ bg: 'teal.700' }}
                    fontWeight="bold"
                >
                    <i className="fa-solid fa-brush"></i>
                </MenuButton>
            </Tooltip>
            <MenuList bg='#1b1b1b' overflowY='auto'>
                {themes.map(([themeName]) => (
                    <MenuItem
                        key={themeName}
                        fontWeight="semibold"
                        color={themeName === theme ? "teal.400" : textColor}
                        bg={themeName === theme ? selectedBg : "transparent"}
                        _hover={{ bg: hoverBg, color: "teal.400" }}
                        onClick={() => onSelectTheme(themeName)}
                    >
                        {themeName.toUpperCase()}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

// Define prop types for Theme
Theme.propTypes = {
    theme: PropTypes.string.isRequired,
    onSelectTheme: PropTypes.func.isRequired
};

export default Theme;
