import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { BiCommentDetail } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';

interface Props {
  title: string;
  description: string;
  content: string;
  image: string;
  alt: string;
  commentCount: string;
  likeCount: string;
}

export default function FitCard({
  title,
  description,
  content,
  image,
  alt,
  commentCount,
  likeCount,
}: Props) {
  return (
    <Card className="transition duration-200 hover:scale-105 cursor-pointer">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Image
          src={image}
          alt={alt}
          width={300}
          height={400}
          className="w-full"
        />
        <p>{content}</p>
        <div className="flex justify-end space-x-4">
          <div className="flex items-center space-x-1">
            <BiCommentDetail className="size-5" />
            <p>{commentCount}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaHeart className="size-5 text-red-500" />
            <p>{likeCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
