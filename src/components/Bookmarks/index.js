import { IconButton, Typography, Box } from '@material-ui/core';
import { ArrowBack as BackIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundBox = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundImage: 'linear-gradient(to bottom right, #191E5D, #0F133A)',
    boxSizing: 'border-box',
    color: '#fff',
});

const BookmarkBox = styled(Box)({
    padding: '15px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: '8px',
    textTransform: 'capitalize',
    marginBottom: '15px',
    fontWeight: 800,
    display: 'block',
    color: '#1e1e2f',
    textDecoration: 'none',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const Bookmarks = ({ bookmarks = {} }) => {
    const bookmarkKeys = Object.keys(bookmarks);

    return (
        <BackgroundBox>
            <Stack sx={{ mb: 3 }} direction="row" alignItems="center" width="100%">
                <IconButton to="/" component={Link} sx={{ color: '#FFD700', mr: 1 }}>
                    <BackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFD700', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    Bookmarks
                </Typography>
            </Stack>
            {
                bookmarkKeys.length ?
                    bookmarkKeys.map(b =>
                        <BookmarkBox key={b} to={`/search/${b}`} component={Link}>
                            {b}
                        </BookmarkBox>)
                    : <Typography sx={{ mt: 5, color: '#ADFF2F', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }} align="center">
                        No Bookmarks
                      </Typography>
            }
        </BackgroundBox>
    );
};

export default Bookmarks;
