import { z } from 'zod';

const baseSchema = {
  category: z.union([
    z.literal('todayFit'),
    z.literal('manFree'),
    z.literal('manQuestion'),
    z.literal('manInfo'),
    z.literal('womanFree'),
    z.literal('womanQuestion'),
    z.literal('womanInfo'),
  ]),
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
};

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

export const postFormSchema = z.union([
  z.object({
    ...baseSchema,
    category: z.literal('todayFit'),
    title: z.string().optional(),
    files: z
      .array(fileSchema)
      .min(1, { message: '최소 1개의 파일이 필요합니다.' })
      .max(1, { message: '최대 1개의 파일만 허용됩니다.' }),
  }),
  z.object({
    ...baseSchema,
    category: z.enum([
      'manFree',
      'manQuestion',
      'manInfo',
      'womanFree',
      'womanQuestion',
      'womanInfo',
    ]),
    title: z.string().min(1, { message: '제목은 필수 입력 요소입니다.' }),
    files: z.array(fileSchema).optional(),
  }),
]);
