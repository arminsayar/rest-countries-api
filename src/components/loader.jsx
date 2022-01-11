import ReactLoading from 'react-loading';

function Loader({ theme }) {
    return (
        <ReactLoading type={'bars'} color={theme === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'} height={200} width={200} />
    );
}

export default Loader;