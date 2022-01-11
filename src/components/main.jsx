import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Items from './items';
import Navbar from './navbar';
import Footer from './footer';
import Pagination from './pagination';

const MainDiv = styled.main`
display:flex;
flex-wrap: wrap;
justify-content: space-around;
background-color:${props => props.theme.background};
overflow-x:hidden;
`;

function Main({ theme }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    const [baseUrl, setBaseUrl] = useState('https://restcountries.com/v3.1/all')

    const urlRegionCreator = (e) => {
        setBaseUrl(`https://restcountries.com/v3.1/region/${e}`);
    }
    const urlSearchCreator = (e) => {
        setBaseUrl(`https://restcountries.com/v3.1/name/${e}`);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            await axios.get(baseUrl)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    // console.warn(err)
                })
            setLoading(false);
        };

        fetchPosts()
    }, [baseUrl])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
        setPostsPerPage(postsPerPage + 8);
    };

    return (
        <>
            {loading === false &&
                <Navbar urlRegionCreator={urlRegionCreator} urlSearchCreator={urlSearchCreator} theme={theme} />
            }
            <MainDiv>
                <Items theme={theme} data={currentPosts} loading={loading} />
            </MainDiv>
            {loading === false && currentPosts.length >= 8 &&
                <Pagination theme={theme} paginate={paginate} totalPosts={data.length} />
            }
            {loading === false &&
                <Footer />
            }
        </>
    )
}

export default Main;