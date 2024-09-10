import { z } from 'zod';

const fileSchema = z.object({
  name: z.string(),
  type: z.string().refine(
    (val) => {
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
      ];
      return allowedTypes.includes(val);
    },
    { message: '허용되지 않는 파일 형식입니다.' }
  ),
  size: z
    .number()
    .max(5 * 1024 * 1024, { message: '파일 크기는 5MB를 초과할 수 없습니다.' }),
});

export const postFormSchema = z.discriminatedUnion('category', [
  z.object({
    category: z.literal('todayFit'),
    title: z.string().optional(),
    content: z.string().min(1, { message: '내용은 필수 입력 요소입니다.' }),
    bodyInfo: z.object({
      gender: z.union([z.literal('male'), z.literal('female')]).optional(),
      height: z.coerce.number().min(0).max(300).optional(),
      weight: z.coerce.number().min(0).max(300).optional(),
    }),
    fashionInfo: z.array(
      z.object({
        section: z.string().min(1),
        info: z.string().min(1),
        size: z.string().min(1),
      })
    ),
    files: z
      .array(fileSchema)
      .min(1, { message: '최소 1개의 파일이 필요합니다.' })
      .max(1, { message: '최대 1개의 파일만 허용됩니다.' }),
  }),
  z.object({
    category: z.enum([
      'maleFree',
      'maleQuestion',
      'maleInfo',
      'femaleFree',
      'femaleQuestion',
      'femaleInfo',
    ]),
    title: z.string().min(1, { message: '제목은 필수 입력 요소입니다.' }),
    content: z.string().min(1, { message: '내용은 필수 입력 요소입니다.' }),
    files: z.array(fileSchema).optional(),
  }),
]);
