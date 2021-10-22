import { useCallback, useEffect, useState } from 'react'
import { loadPosts } from '../../utils/loadPosts.js'
import TextInput from '../../components/TextInput'
import { Button } from '../../components/Button'
import { Posts } from '../../components/Posts'

import './styles.css'


export const Home = ()=>{
    const [ posts, setPosts ] = useState([])
    const [ allPosts, setAllPosts ] = useState([])
    const [ page, setPage ] = useState(0)
    const [ searchValue, setSearchValue ] = useState('')
    
    const postsPerPage = 10

    const noMorePosts = (page + postsPerPage >= allPosts.length)
    
    const filteredPosts = !!searchValue ? allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts

    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await loadPosts()
        setPosts(postsAndPhotos.slice(page, postsPerPage))
        setAllPosts(postsAndPhotos)
    }, [])

    useEffect(()=>{
        
        handleLoadPosts(0, postsPerPage)

    }, [handleLoadPosts, postsPerPage])

    const handleChange = (e) => {
        const { value } = e.target
        setSearchValue(value)
    }
    const loadMorePosts = () => {
        const nextPage = page + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
        posts.push(...nextPosts)
        setPosts(posts)
        setPage(nextPage)
    }

    return (
        <section className="container">
            <div className="serach-container">
                {!!searchValue && (
                    <h1>Search value: {searchValue}</h1>
                )}
                <TextInput searchValue={searchValue} handleChange={handleChange} />
            </div>
            {filteredPosts.length > 0 && (
                <Posts posts={filteredPosts} />
            )}
            {filteredPosts.length === 0 && (
                <p>Não Existem Posts...</p>
            )}
            <div className="button-container">
                {!searchValue && (
                    <Button 
                        text="Load more posts"
                        onClick={loadMorePosts}
                        disabled={noMorePosts}
                        />
                )}
            </div>
        </section>
    )    
}
