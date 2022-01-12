import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";

const paddingTop = {
    paddingTop: "10px",
},
    paddingBottom = {
        paddingBottom: "10px",
    };

const MainDiv = styled.div`
display:flex;
width: 100vw;
align-items:center;
justify-content:space-between;
height:100px;
background-color: ${props => props.theme.background};
@media (min-width: 320px){
align-items:flex-start;
flex-direction:column;
margin-top:20px;
}
@media (min-width: 960px) {
    align-items:center;
flex-direction:row;
margin-top:30px;
}

`,
    SearchInput = styled.input`
margin-left:48px;
border:none;
box-shadow: 0 0 5px 0 ${props => props.theme.shadow};
padding:12px 140px 12px 55px;
color: ${props => props.theme.texts};
font-family: 'Nunito Sans', sans-serif;
font-weight:600;
border-radius:5px;
background-color: ${props => props.theme.elements};
:focus {
    outline: 0;
}
::placeholder{
    color:${props => props.theme.texts};
    font-family: 'Nunito Sans', sans-serif;
}
@media (min-width: 320px){
    margin:0;
    width:90vw;
    margin: 0 20px 0 20px;
}
@media (min-width: 375px){
    margin: 0 45px 0 45px;
    width:75vw;
}
@media (min-width: 425px){
    margin: 0 70px 0 70px;
    width:67vw;
}
@media (min-width: 768px){
    margin: 0 50px 0 50px;
    width:87vw;
}
@media (min-width: 960px) {
    width:35vw;
    margin: 0 20px 0 95px;
    padding:16px 140px 16px 55px;
}
@media (min-width: 1024px) {
    width:35vw;
    margin: 0 20px 0 20px;
}
@media (min-width: 1440px) {
    width:35vw;
    margin: 0 30px 0 30px;
}

`,
    FilterInput = styled.div`
margin-right:2em;
background-color:${props => props.theme.elements};
border:none;
box-shadow: 0 0 5px 0 ${props => props.theme.shadow};
border-radius:5px;
font-family: 'Nunito Sans', sans-serif;
font-weight:600;
font-size:13px;
color:${props => props.theme.texts};
margin-right:48px;
appearance: none;
cursor:pointer;
position: relative;
width:145px;
@media (min-width: 320px) {
    margin: 0 20px 0 20px; 
}
@media (min-width: 375px){
    margin: 0 45px 0 45px;
}
@media (min-width: 425px){
    margin: 0 70px 0 70px;
}
@media (min-width: 768px){
    margin: 0 50px 0 50px;
}
@media (min-width: 960px) {
    margin: 0 95px 0 20px; 
padding:6px 0 6px 0;
}
@media (min-width: 1024px) {
    margin: 0 20px 0 20px; 
}
@media (min-width: 1440px) {
    margin: 0 30px 0 30px;
}
`,
    SearchIcon = styled.i`
position:absolute;
left:70px;;
color:${props => props.theme.texts};
font-size:15px;
@media (min-width: 320px){
    top:112px;
    left:40px;
}
@media (min-width: 375px){
    left:65px;
}
@media (min-width: 425px){
    left:90px;
}
@media (min-width: 768px){
    left:70px;
}
@media (min-width: 960px) { 
    top:150px;
    left:115px;
}
@media (min-width: 1024px) { 
    left:35px;
}
@media (min-width: 1440px) {
    left:50px;
}
`,
    FilterIcon = styled.i`
position:absolute;
font-size:15px;
right:60px;
margin-bottom:5px;
z-index:1;
cursor:pointer;
color: hsl(0, 0%, 52%);
font-size:15px;
@media (min-width: 320px){
    top:170px;
    left:140px;
    width:10px;
}
@media (min-width: 375px){
    left:165px;
}
@media (min-width: 425px){
    left:190px;
}
@media (min-width: 768px){
    left:170px;
}
@media (min-width: 960px) { 
    top:148px;
    left:87.5%;
    width:10px;
}
@media (min-width: 1024px) { 
    left:95.5%;
}
@media (min-width: 1250px) { 
    left:97.5%;
}
@media (min-width: 1440px) { 
    left:96.2%;
}
@media (min-width: 1750px) { 
    left:97.5%;
}
`,
    DropDownMenu = styled.div`
position:absolute;
background-color:${props => props.theme.elements};
cursor:pointer;
border-radius:5px;
width:145px;
color:${props => props.theme.texts};
box-shadow: 0 0 5px 0 ${props => props.theme.shadow};
top:42px;
`,
    Items = styled.input`
padding:5px 0 5px 15px;
width:145px;
background-color:${props => props.theme.elements};
border:none;
color:${props => props.theme.texts};
:focus {
    outline: none;
}
:hover {
    background-color:hsl(0, 0%, 80%);
}
cursor:pointer;
`,
    InputTitle = styled.div`
padding: 10px 40px 10px 15px;
`;

const regions = {
    africa: 'africa',
    america: 'ame',
    asia: 'asia',
    europe: 'europe',
    oceania: 'oceania'
}
function Navbar({ urlRegionCreator, urlSearchCreator }) {
    const ref = useRef();
    const [menuStlye, setMenuStlye] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setMenuStlye(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuStlye, ref])

    const DropDownMenuToggle = () => {
        if (menuStlye === false) {
            setMenuStlye(true)
        } else {
            setMenuStlye(false)
        }
    }

    return (
        <MainDiv ref={ref}>
            <SearchInput type="text" onChange={(e) => setTimeout(() => { urlSearchCreator(e.target.value) }, 1500)} placeholder="Search for a country..." />
            <SearchIcon className="fas fa-search"></SearchIcon>
            <FilterIcon onClick={() => DropDownMenuToggle()} className="fas fa-sort-down"></FilterIcon>
            <FilterInput >
                <InputTitle onClick={() => DropDownMenuToggle()}>
                    Filter by region
                </InputTitle>
                {menuStlye && (
                    <DropDownMenu onClick={() => DropDownMenuToggle()} style={menuStlye}>
                        <Items readOnly value="Africa" onClick={() => urlRegionCreator(regions.africa)} style={paddingTop} />
                        <Items readOnly value="America" onClick={() => urlRegionCreator(regions.america)} />
                        <Items readOnly value="Asia" onClick={() => urlRegionCreator(regions.asia)} />
                        <Items readOnly value="Eorupe" onClick={() => urlRegionCreator(regions.europe)} />
                        <Items readOnly value="Oceania" onClick={() => urlRegionCreator(regions.oceania)} style={paddingBottom} />
                    </DropDownMenu>
                )}
            </FilterInput>

        </MainDiv>
    );
}

export default Navbar;