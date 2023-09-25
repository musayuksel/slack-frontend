import { useState, type FC } from 'react';
import { HttpMethod, fetchData } from '../../utils';

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

  // console.log({ imageFile });
  const handleUploadFile = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imageFile) {
      return;
    }

    const { signedUrl, fileName } = await getSignInUrl(imageFile?.name);

    console.log({ signedUrl, fileName });
    try {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        // headers: {
        //   'Content-Type': 'image/png',
        //   // 'Content-Type': 'application/octet-stream',
        // },
        body: imageFile,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      setImageUrl(response.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
