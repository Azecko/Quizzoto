import * as React from 'react';
import { useRouter } from 'next/router';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function UserList({ users }) {
	const router = useRouter();

	if (!users) {
		return null;
	}

	const handleClick = (username) => {
		router.push(`/user/${username}`);
	};

	return (
		<List dense sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper' }}>
			{users.map((e, index) => {
				return (
					<ListItem key={index} disablePadding>
						<ListItemButton onClick={() => handleClick(e.username)} style={{ padding: '12px' }}>
							<ListItemAvatar>
								<Avatar alt={e.username} src={e.image} />
							</ListItemAvatar>
							<ListItemText primary={e.username} />
							{e.displayPoints ? <ListItemText primary={e.points} sx={{ textAlign: 'right' }} /> : <></>}
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}
