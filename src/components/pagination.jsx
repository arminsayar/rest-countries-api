import styled from 'styled-components';

const UlStyled = styled.ul`
display:flex;
justify-content:center;
align-items:center;
margin:0 0 48px 0;
@media (min-width: 320px) {
    margin:30px 0 120px 0;
}
`,
    LiStyled = styled.li`
margin: 0 5px;
padding:10px 100px;
display:flex;
justify-content:center;
align-items:center;
background-color: ${props => props.theme.elements};
box-shadow: 0 0 5px 0 ${props => props.theme.shadow};
color: ${props => props.theme.texts};
border: 1px solid transparent;
cursor:pointer;
:hover{
    border: 1px solid hsl(0, 0%, 60%);
}
`,
    LinkStyled = styled.a`
`;

function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav>
            <UlStyled>
                <LiStyled onClick={() => paginate()}>
                    <LinkStyled>
                        See more...
                    </LinkStyled>
                </LiStyled>
            </UlStyled>
        </nav >
    )
}

export default Pagination;