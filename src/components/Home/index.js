import { useState } from 'react';
import { Box, Typography, FilledInput, IconButton, InputAdornment, useTheme } from '@material-ui/core';
import { Search as SearchIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';

const BackgroundBox = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'linear-gradient(to bottom right, #191E5D, #0F133A)',
    padding: '20px',
    boxSizing: 'border-box',
    textAlign: 'center',
});

const StyledInput = styled(FilledInput)({
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
    '& .MuiFilledInput-input': {
        padding: '15px',
    },
});

const GradientButton = styled(IconButton)({
    borderRadius: '8px',
    padding: '15px',
    color: '#fff',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0px 10px 10px rgba(255, 105, 135, .3)',
    transition: 'background 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
});

const Home = () => {
    const [word, setWord] = useState('');
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedWord = word.trim().toLowerCase();
        if (!trimmedWord || trimmedWord.split(' ').length > 1) return;
        navigate(`/search/${trimmedWord}`);
    };

    return (
        <BackgroundBox>
            <img src="/assets/images.webp" alt="Book" style={{ maxWidth: '200px', marginBottom: '30px' }} />
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#fff', 
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
            >
                Dictionary
            </Typography>
            <Typography
                sx={{
                    color: '#fff', 
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                }}
            >
                Find meanings and save for quick reference
            </Typography>
            <Box sx={{ width: '100%', maxWidth: '400px', mb: 6 }}>
                <form onSubmit={handleSubmit}>
                    <StyledInput
                        value={word}
                        onChange={(event) => setWord(event.target.value)}
                        disableUnderline
                        placeholder="Search word"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon color="disabled" />
                            </InputAdornment>
                        }
                        fullWidth
                    />
                </form>
            </Box>
            <GradientButton to="/bookmarks" component={Link}>
                <BookmarkIcon />
            </GradientButton>
        </BackgroundBox>
    );
};

export default Home;
