import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import antihackbg from '../../assets/antihack.png' 
import moment from 'moment'
import 'moment/locale/pt-br'
import { 
    Grid, 
    Box, 
    Typography, 
    makeStyles,
    useTheme,
    useMediaQuery,
    Paper
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    gridAntihack: {
        cursor: "pointer",
        backgroundImage: `url(${antihackbg})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 100%",
        transition: "0.3s",
        height: 160,
        '&:hover': {
            backgroundSize: "auto 103%"
        }
    },
    authorImage: {
        borderRadius: 5,
        marginRight: 15
    }, 
    newTitle: {
        cursor: "pointer"
    }
}))

function HomeContent() {
    const classes = useStyles()
    const theme = useTheme()
    const history = useHistory()
    const [news, setNews] = useState([])

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    })

    async function getNews(){
        try {
            const loadedNews = await api.server.get('/')
            const { data } = loadedNews
            setNews(data.data)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getNews() 
    }, [])

    return (
        <Box
        component={Grid}
        item
        pr={isMobile ? 0 : 0.4}
        md={8}
        xs={12}>
            <Box
            component={Grid}
            item
            display={isMobile ? "none" : null}
            pb={1.2}
            xs={12}>
                <Box
                component={Paper}
                className={classes.gridAntihack}
                height={160}
                elevation={5}
                onClick={ () => {
                    history.push("antihack")
                }}>
                </Box>
            </Box>

            {news
            .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1) //sort by createdAt
            .map(New => { return (
                <Box
                key={New._id}
                component={Grid}
                item
                pb={1.2}
                xs={12}>
                    <Box
                    component={Paper}
                    overflow="hidden"
                    elevation={5}>
                        <Box
                        bgcolor="white"
                        display="flex"
                        alignItems="center"
                        p={2}>
                            <img 
                            className={classes.authorImage}
                            src={"https://cravatar.eu/avatar/" + New.author + "/70.png"} 
                            alt="author" />
                            <Typography>
                                <Box 
                                display="inline" 
                                fontSize={16} 
                                fontWeight={600}>
                                    {New.author}
                                </Box><br/>
                                <Box 
                                display="inline" 
                                fontSize={14}>
                                    {moment(New.createdAt).format('LL')}
                                </Box>
                            </Typography>
                        </Box>
                        
                        <Box
                        className={classes.newTitle}
                        bgcolor="#262626"
                        p={3}
                        onClick={() => { 
                            history.push("novidades/" + New.slug);
                        }}>
                            <Typography>
                                <Box 
                                display="inline"
                                color="white" 
                                fontSize={18}>
                                    {New.subtitle}
                                </Box><br/>
                                <Box 
                                display="inline"
                                color="white"
                                fontWeight="bold"
                                lineHeight={1} 
                                fontSize={26}>
                                    {New.title}
                                </Box>
                            </Typography>
                        </Box>
                        
                        <Box
                        bgcolor="white"
                        p={2.5}>
                            <Typography>
                                {New.content}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )})}
        </Box>
    )
}

export default HomeContent
