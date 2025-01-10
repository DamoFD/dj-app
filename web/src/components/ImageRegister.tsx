interface ImageRegisterProps {
    payload: any
}

const ImageRegister: React.FC<ImageRegisterProps> = ({payload}) => {
    console.log(payload);

    return (
        <div>
            <h1>Image Register</h1>
        </div>
    );
}

export default ImageRegister;
