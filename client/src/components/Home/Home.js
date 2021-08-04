import React,{useState} from 'react'
import { Container, Grow, Grid ,Paper,AppBar,TextField,Button} from "@material-ui/core"
import Posts from "../../components/Posts/Posts";
import Forms from '../../components/Forms/Forms'
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from "material-ui-chip-input"
import { useDispatch } from "react-redux"
import {getPostsBySearch} from '../../actions/posts'
import useStyles from './styles'
import Paginate from '../Pagination';
function useQuery(){
    return new URLSearchParams(useLocation().search)
}
function Home() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search,setSearch] = useState("")
    const [tags,setTags] = useState([])
    const handleKeyPress = (e)=>{
            if(e.keyCode === 13){
                searchPost()
            }
    }
    const searchPost = ()=>{
        if(search.trim() || tags ){
            dispatch(getPostsBySearch({search,tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/')
        }
    }
    const handleAdd = (tag)=> setTags([...tags,tag]) 
    const handleDelete = (tagstoDelete)=> setTags(tags.filter((tag)=> tag !== tagstoDelete))
    return (
        <Grow in >
            <Container maxWidth="xl" >
                <Grid container className={classes.gridContainer} justify="space-between"  alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                    <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                        <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e)=>setSearch(e.target.value)} />
                        <ChipInput style={{margin : "10px 0"}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
                        <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" >Search</Button>
                    </AppBar>
                        <Forms currentId={currentId} setCurrentId={setCurrentId} />
                        {!searchQuery && !tags.length && (
                            <Paper className={classes.pagination} elevation={6} >
                                <Paginate page={page} />
                            </Paper>
                        )}
                       
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home