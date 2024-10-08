import { useState, useEffect, Fragment } from 'react';
import { Typography, Box, IconButton, Divider, CircularProgress, Button, styled } from '@material-ui/core';
import { ArrowBack as BackIcon, BookmarkBorder as BookmarkIcon, Bookmark as BookmarkedIcon, PlayArrow as PlayIcon } from '@material-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack } from '@mui/material';

const AlignCenterBox = styled(Box)(({ theme }) => ({ ...theme.mixins.alignInTheCenter }));

const Definition = ({ bookmarks = {}, addBookmark, removeBookmark }) => {
    const { word } = useParams();
    const navigate = useNavigate();
    const [definitions, setDefinitions] = useState([]);
    const [exist, setExist] = useState(true);
    const [audio, setAudio] = useState(null);

    const isBookmarked = bookmarks && Object.keys(bookmarks).includes(word);

    const updateState = (data) => {
        setDefinitions(data);
        const phonetics = data[0]?.phonetics || [];
        if (phonetics.length) {
            const audioUrl = phonetics.find(p => p.audio)?.audio;
            if (audioUrl) setAudio(new Audio(audioUrl));
        }
    };

    useEffect(() => {
        const fetchDefinition = async () => {
            try {
                const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                updateState(resp.data);
            } catch (err) {
                setExist(false);
            }
        };

        if (!isBookmarked) {
            fetchDefinition();
        } else {
            updateState(bookmarks[word]);
        }
    }, [word, isBookmarked, bookmarks]);

    if (!exist) {
        return (
            <AlignCenterBox>
                <Typography>Word not found</Typography>
                <Button variant="contained" sx={{ textTransform: 'capitalize', mt: 2 }} onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </AlignCenterBox>
        );
    }

    if (!definitions.length) {
        return (
            <AlignCenterBox>
                <CircularProgress />
            </AlignCenterBox>
        );
    }

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <IconButton onClick={() => navigate(-1)}>
                    <BackIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton onClick={() => (isBookmarked ? removeBookmark(word) : addBookmark(word, definitions))}>
                    {isBookmarked ? <BookmarkedIcon sx={{ color: 'black' }} /> : <BookmarkIcon sx={{ color: 'black' }} />}
                </IconButton>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    mt: 3,
                    background: 'linear-gradient(90.17deg, #191E5D 0.14%, #0F133A 98.58%)',
                    boxShadow: '0px 10px 20px rgba(19, 23, 71, 0.25)',
                    px: 4,
                    py: 5,
                    color: 'white',
                    borderRadius: 2,
                }}
            >
                <Typography sx={{ textTransform: 'capitalize' }} variant="h5">
                    {word}
                </Typography>
                {audio && (
                    <IconButton
                        onClick={() => audio.play()}
                        sx={{
                            borderRadius: 2,
                            p: 1,
                            color: '#fff',
                            background: theme => theme.palette.pink,
                        }}
                    >
                        <PlayIcon />
                    </IconButton>
                )}
            </Stack>

            {definitions.map((def, idx) => (
                <Fragment key={idx}>
                    <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }} />
                    {def.meanings.map((meaning, meaningIdx) => (
                        <Box
                            key={meaningIdx}
                            sx={{
                                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                                backgroundColor: '#fff',
                                p: 2,
                                borderRadius: 2,
                                mt: 3,
                            }}
                        >
                            <Typography sx={{ textTransform: 'capitalize' }} color="GrayText" variant="subtitle1">
                                {meaning.partOfSpeech}
                            </Typography>
                            {meaning.definitions.map((definition, defIdx) => (
                                <Typography sx={{ my: 1 }} variant="body2" color="GrayText" key={defIdx}>
                                    {meaning.definitions.length > 1 && `${defIdx + 1}. `} {definition.definition}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Fragment>
            ))}
        </>
    );
};

export default Definition;
