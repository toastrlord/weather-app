function LoadingCircle(props) {
    const delay = props.delay;
    return (
        <div className='loading-circle' style={{
            animationDelay: `${delay}s`
        }} />
    );
}

function LoadingIcon(props) {
    return (
        <div className='loading-container'>
            <LoadingCircle delay={-.5} />
            <LoadingCircle delay={-.25} />
            <LoadingCircle delay={0} />
        </div>
    );
}

export default LoadingIcon;