import styled from 'styled-components';

const HeaderDiv = styled.header`
width: 100vw;
height: 5em;
transition: background-color .15s ease-in-out;
background-color: ${props => props.theme.elements};
box-shadow: 0 1px 5px 0 ${props => props.theme.shadow};
display:flex;
align-items: center;
justify-content:space-between;
position: relative;


`,
    Title = styled.a`
margin-left: 48px;
font-weight:800;
font-size:1.5em;
transition: color .15s ease-in-out;
color: ${props => props.theme.texts};
@media (min-width: 320px) {
    margin-left: 20px;
    font-size:.9em;
}
@media (min-width: 375px){
    margin: 0 45px 0 45px;
    font-size:.7em;
}
@media (min-width: 425px){
    margin: 0 70px 0 70px;
    font-size:.7em;
}
@media (min-width: 768px){
    margin: 0 50px 0 50px;
    font-size:1em;
}
@media (min-width: 960px) {
    margin-left: 95px;
    font-size:1.3em;
}
@media (min-width: 1024px) {
    margin-left: 20px;
    font-size:1.5em;
}
@media (min-width: 1440px) {
    margin-left: 30px;
}
`,
    DarkMode = styled.div`
margin-right: 48px;
font-weight:600;
font-size:1em;
letter-spacing:-.5px;
cursor: pointer;
transition: color .15s, font-size .15s ease-in-out;
color: ${props => props.theme.texts};

@media (min-width: 320px) {
    margin-right: 20px;
}
@media (min-width: 375px){
    margin: 0 45px 0 45px;
    font-size:.7em;
}
@media (min-width: 425px){
    margin: 0 70px 0 70px;
    font-size:.7em;
}
@media (min-width: 768px){
    margin: 0 50px 0 50px;
    font-size:1em;
}
@media (min-width: 960px) {
    margin-right: 95px;
    font-size:1.3em;
}
@media (min-width: 1024px) {
    margin-right: 20px;
    font-size:1.5em;
}
@media (min-width: 1440px) {
    margin-right: 30px;
}
`,
    DarkModeIcon = styled.i`
margin-right:.5em;
font-size:.8em;
transition: color .15s ease-in-out;
color: ${props => props.theme.texts};
`;

function Header({ themesToggle, theme }) {
    return (
        <>
            <HeaderDiv>
                <Title href='/'>Where in the world?</Title>
                <DarkMode onClick={() => themesToggle()}><DarkModeIcon className="far fa-moon"></DarkModeIcon>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</DarkMode>
            </HeaderDiv>
        </>
    )
}

export default Header;