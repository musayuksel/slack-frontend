import { useState, type FC } from 'react';
import { HttpMethod, fetchData } from '../utils';

export const UploadFile: FC = () => {
  const [imageUrl, setImageUrl] = useState(undefined as string | undefined);

  const [imageFile, setImageFile] = useState({} as File);
  const handleUploadFile = async (event: React.FormEvent) => {
    event.preventDefault();

    const generateS3SignInUrl = await fetchData(
      '/messages/generateS3SignInUrl',
      HttpMethod.POST,
      JSON.stringify({ fileName: imageFile.name }),
    );
    const { signedUrl, fileName } = await generateS3SignInUrl.json();

    console.log({ fileName });

    const response = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: imageFile,
    });
    console.log({ response });
    setImageUrl(response.url);
  };

  const test = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(event.target.files?.[0] as File);
  };

  return (
    <>
      <form onSubmit={handleUploadFile}>
        <input onChange={test} type="file" />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="uploaded" />}
    </>
  );
};
