import { useState, type FC } from 'react';
import { HttpMethod, fetchData } from '../utils';

export const UploadFile: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const handleUploadFile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imageFile) {
      return;
    }

    const generateS3SignInUrl = await fetchData({
      url: '/messages/generateS3SignInUrl',
      method: HttpMethod.POST,
      body: JSON.stringify({ fileName: imageFile?.name }),
    });
    const { signedUrl, fileName } = await generateS3SignInUrl.json();

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
    console.log(event.target.files);
    setImageFile(event.target.files?.[0]);
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
