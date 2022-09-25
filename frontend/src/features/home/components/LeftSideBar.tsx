import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useMe } from '@/hooks/useMe';
import { useAuth } from '@/providers/auth';

export const LeftSideBar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { me } = useMe();

  const onSignOut = async () => {
    await signOut();
    navigate('auth/sign-in');
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="end"
      h="full"
      w="full"
      p="6"
      borderRightWidth="1px"
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Avatar />
          <Box fontWeight="bold">{me.name}</Box>
        </HStack>

        <Box>
          <Menu placement="top-end">
            <MenuButton as={Button}>
              <HamburgerIcon />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Flex>
  );
};
