import { describe, it, expect } from 'vitest';
import { handleNotFound, handleRelationNotFound } from '../utils/responses';
import { addDateSuffix, dateFormat } from '../utils/dateFormat';

const mockResponse = () => {
  const res: any = {};
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload: object) => {
    res.body = payload;
    return res;
  };
  return res;
};

// ===================================
// Response Helpers
// ===================================
describe('handleNotFound', () => {
  it('returns correct status and message for user', () => {
    const res = mockResponse();
    handleNotFound(res, 'User');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No user with this id!');
  });
});

describe('handleRelationNotFound', () => {
  it('returns correct status and message for relation', () => {
    const res = mockResponse();
    handleRelationNotFound(res, 'Thought', 'User');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Thought created but no user with this id!');
  });
});

// ===================================
// Date Helpers
// ===================================
describe('addDateSuffix', () => {
  it('returns correct suffixes', () => {
    expect(addDateSuffix(1)).toBe('1st');
    expect(addDateSuffix(2)).toBe('2nd');
    expect(addDateSuffix(3)).toBe('3rd');
    expect(addDateSuffix(4)).toBe('4th');
    expect(addDateSuffix(11)).toBe('11th');
  });
});

describe('dateFormat', () => {
  it('formats with short month and suffix', () => {
    const result = dateFormat(new Date('2024-04-09T14:30:00'), {
      monthLength: 'short',
      dateSuffix: true,
    });
    expect(result).toContain('Apr 9th, 2024');
    expect(result).toContain('2:30 pm');
  });

  it('formats with long month and no suffix', () => {
    const result = dateFormat(new Date('2024-04-01T00:01:00'), {
      monthLength: 'long',
      dateSuffix: false,
    });
    expect(result).toContain('April 1, 2024');
    expect(result).toContain('12:01 am');
  });
});
