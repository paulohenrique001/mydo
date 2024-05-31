const LoadingSpinner = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="rounded-full h-32 w-32 border-t-4 border-b-4 border-slate-200 animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
