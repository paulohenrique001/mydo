import Image from "next/image";

const EmptyData = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-1/2">
                <Image
                    src="/undraw_no_data.png"
                    alt="Duas pranchetas vazias lado a lado"
                    width={250}
                    height={250}
                    priority={true}
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default EmptyData;
