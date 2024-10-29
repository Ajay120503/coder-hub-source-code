import PropTypes from 'prop-types';
import {
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    // Icon
} from '@chakra-ui/react';
import { LANG_VERSIONS } from '../../Conts/Conts';
import { Tooltip } from '@chakra-ui/react';

const languages = Object.entries(LANG_VERSIONS);

function DragMenu({ language, onSelect }) {
    return (
        <Menu isLazy>
            <Tooltip hasArrow arrowSize={10} placement='top-start' label='Change the Progamming Language' fontSize='xs'>
                <MenuButton
                    as={Button}
                    colorScheme="teal"
                    variant="solid"
                    size='sm'
                    borderRadius="md"
                    fontSize="lg"
                    _hover={{ bg: 'teal.700' }}
                    _active={{ bg: 'teal.700' }}
                    fontWeight="bold"
                >
                    <i style={{ padding: 0 }} className="fa-solid fa-language"></i>
                    {/* <Icon as={ChevronDownIcon} ml={2} /> */}
                </MenuButton>
            </Tooltip>
            <MenuList bg='#1b1b1b' h='300px' overflowY='auto'>
                {languages.map(([lang, version]) => (
                    <MenuItem
                        key={lang}
                        fontWeight="semibold"
                        color={lang === language ? "teal.400" : "#fff"}
                        bg={lang === language ? "grey.700" : "transparent"}
                        _hover={{ bg: "#333", color: "grey.900" }}
                        onClick={() => onSelect(lang)}
                    >
                        {lang.toUpperCase()}
                        <Text as='i' color='#6e6e6e' fontSize='xs' ml={2}>{version}</Text>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

// Define prop types for DragMenu
DragMenu.propTypes = {
    language: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default DragMenu;
