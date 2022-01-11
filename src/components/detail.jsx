import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from './loader';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

const BackButton = styled.button`
background-color: ${props => props.theme.elements};
border:1px transparent solid;
box-shadow: 0 0 5px 0 ${props => props.theme.shadow};
padding: 10px 30px;
display:flex;
align-items: center;
margin:40px 0 40px 48px;
color: ${props => props.theme.texts};
cursor:pointer;
:hover{
    border:1px ${props => props.theme.text} solid;
}
@media (min-width: 320px) {
    margin:30px 0 30px 20px;
}
@media (min-width: 960px) {
    margin:40px 0 40px 48px;
}
`,
    BackStyled = styled.span`
margin: 0 5px 0 5px;
`,
    MainDiv = styled.div`
width:100vw;
display: flex;
flex-direction:row;
justify-content: center;
align-items: center;
margin:70px 0 70px 0;
color: ${props => props.theme.texts};
@media (min-width: 320px) {
    margin:30px 0 30px 20px;
    display: block;
    width:85vw;
}
@media (min-width: 960px) {
width:100vw;
display: flex;
margin:70px 0 70px 20px;
}
`,
    SubDiv = styled.div`
display: flex;
flex-direction:row;
align-items: center;
@media (min-width: 320px) {
    flex-direction:column;
    align-items:flex-start;
}
@media (min-width: 960px) {
    flex-direction:row;
align-items: center;
margin:0 20px 0 0;
}
`,
    Flags = styled.img`
width:480px;
height:340px;
margin-right:48px;
@media (min-width: 320px) {
    width:85vw;
    height:150px;
}
@media (min-width: 960px) {
    width:480px;
height:340px;
}
@media (min-width: 768px) {
    width:420px;
height:300px;
}
`,
    HStyled = styled.h3`
font-size:32px;
font-weight:800;
margin-bottom:24px;
@media (min-width: 320px) {
    margin-top:30px;
    font-size:26px;
}
@media (min-width: 960px) {
    font-size:32px;
}
`,
    StyledP = styled.p`
font-size:16px;
font-weight:600;
margin: 0 0 6px 6px;
`,
    StyledSpan = styled.span`
font-weight:400;
margin: 0 0 0 8px;
`,
    SectionTwo = styled.div`
height:72px;
margin-left:48px;
@media (min-width: 320px) {
    margin-left:0;
}
@media (min-width: 960px) {
    margin-left:48px;
}
`,
    Borders = styled.div`
font-size:16px;
font-weight:600;
margin: 48px 0 0 6px;
display: flex;
@media (min-width: 320px) {
    margin: 6px 0 0 6px;
}
@media (min-width: 960px) {
    margin: 48px 0 0 6px;
}
`,
    Countries = styled.p`
padding: 2px;
font-weight:400;
margin: 0 0 0 8px;
background-color: ${props => props.theme.elements};
box-shadow: 0 0 5px 0 ${props => props.theme.shadow};
`,
    MainLoader = styled.main`
display:flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
background-color:${props => props.theme.background};
`,
    ErrorMessage = styled.h2`

`;

function Detail({ theme }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { name } = useParams()

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
                .then((response) => {
                    if (response.data.status === 404) {
                        setError(true);
                        setLoading(false);
                    } else {
                        setData(response.data);
                        setLoading(false);
                    }
                })
        };
        fetchPosts()
    }, [name]);

    if (error) {
        return (
            <>
                <MainLoader>
                    <ErrorMessage>Nothing Found🥴turn back👉</ErrorMessage>
                    <Link to='/'>
                        <BackButton><BiArrowBack /><BackStyled>Back</BackStyled></BackButton>
                    </Link>
                </MainLoader>
            </>
        )
    };

    if (loading) {
        return (
            <MainLoader>
                <Loader theme={theme} />
            </MainLoader>

        )
    };

    return (
        <>
            {!loading &&
                <Link to='/'>
                    <BackButton><BiArrowBack /><BackStyled>Back</BackStyled></BackButton>
                </Link>}
            <MainDiv>
                {data.map((item) => (
                    <React.Fragment key={item.nativeName}>
                        <Flags alt={item.name.common} src={item.flags.png} />
                        <SubDiv>
                            <div>
                                <HStyled>{item.name}</HStyled>
                                <StyledP>Native Name:<StyledSpan>{item.nativeName}</StyledSpan></StyledP>
                                <StyledP>Population:<StyledSpan>{item.population.toLocaleString()}</StyledSpan></StyledP>
                                <StyledP>Region:<StyledSpan>{item.region}</StyledSpan></StyledP>
                                <StyledP>Sub Region:<StyledSpan>{item.subregion}</StyledSpan></StyledP>
                                <StyledP>Capital:<StyledSpan>{item.capital}</StyledSpan></StyledP>
                                <Borders>Border Countries:
                                    {item.borders === undefined ? null : Array(item.borders).map((border) => (
                                        <React.Fragment key={item.nativeName}>
                                            <Countries>{border[0]}</Countries>
                                        </React.Fragment>
                                    ))}
                                </Borders>
                            </div>
                            <SectionTwo>
                                <StyledP>Top Level Domain:<StyledSpan>{item.topLevelDomain}</StyledSpan></StyledP>
                                <StyledP>Currencies:<StyledSpan>{item.currencies[0].name}</StyledSpan></StyledP>
                                <StyledP>Languages:<StyledSpan>{item.languages[0].name}</StyledSpan></StyledP>
                            </SectionTwo>
                        </SubDiv>
                    </React.Fragment>
                ))}
            </MainDiv>
        </>
    )
}


export default Detail;