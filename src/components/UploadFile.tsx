import { useState, type FC } from 'react';
import { HttpMethod, fetchData } from '../utils';

const getSignInUrl = async (fileName: string) => {
  const response = await fetchData({
    url: '/messages/generateS3SignInUrl',
    method: HttpMethod.POST,
    body: JSON.stringify({ fileName }),
  });
  const data = await response.json();
  return data;
};

export const UploadFile: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const handleUploadFile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imageFile) {
      return;
    }

    const { signedUrl, fileName } = await getSignInUrl(imageFile?.name);

    const response = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: imageFile,
    });

    console.log({ response, fileName });
    setImageUrl(response.url);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => setImageFile(event.target.files?.[0]);

  return (
    <>
      <form onSubmit={handleUploadFile}>
        <input onChange={handleFileChange} type="file" />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="uploaded" />}
    </>
  );
};
