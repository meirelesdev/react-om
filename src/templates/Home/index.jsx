import { Component } from 'react'
import './styles.css'
import { loadPosts } from '../../utils/loadPosts.js'
import TextInput from '../../components/TextInput'
import { Button } from '../../components/Button'
import { Posts } from '../../components/Posts'


export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 2,
        searchValue: ''
    }

    async componentDidMount() {
        await this.getAllPosts()
    }
    getAllPosts = async () => {
        const { page, postsPerPage } = this.state
        const postsAndPhotos = await loadPosts()
        this.setState({
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos,
        })
    }
    loadMorePosts = () => {
        const {
            page,
            postsPerPage,
            allPosts,
            posts
        } = this.state
        const nextPage = page + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
        posts.push(...nextPosts)
        this.setState({ posts, page: nextPage })
    }
    handleChange = (e) => {
        const { value } = e.target
        this.setState({ searchValue: value })
    }
    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state
        const noMorePosts = (page + postsPerPage >= allPosts.length)
        const filteredPosts = !!searchValue ? allPosts.filter(post => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase())
        }) : posts

        return (
            <section className="container">
                <div className="serach-container">
                    {!!searchValue && (
                        <h1>Search value: {searchValue}</h1>
                    )}
                    <TextInput searchValue={searchValue} handleChange={this.handleChange} />
                </div>
                {filteredPosts.length > 0 && (
                    <Posts posts={filteredPosts} />
                )}
                {filteredPosts.length === 0 && (
                    <p>Não Existem Posts =(</p>
                )}
                <div className="button-container">
                    {!searchValue && (
                        <Button 
                            text="Load more posts"
                            onClick={this.loadMorePosts}
                            disabled={noMorePosts}
                            />
                    )}
                </div>
            </section>
        )
    }
}