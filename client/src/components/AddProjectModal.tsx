import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import type { NewProject } from '../types';

interface AddProjectModalProps {
  onAdd: (project: NewProject) => void;
  onClose: () => void;
}

export function AddProjectModal({
  onAdd,
  onClose,
}: AddProjectModalProps): JSX.Element {
  const [type, setType] = useState<'신규' | '추가'>('신규');
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');
  const [os, setOs] = useState('');
  const [totalMemory, setTotalMemory] = useState<number>(0);
  const [availableMemory, setAvailableMemory] = useState<number>(0);
  const [requestDetail, setRequestDetail] = useState('');

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    onAdd({
      type,
      name,
      period,
      description,
      os,
      totalMemory,
      availableMemory,
      requestDetail,
    });
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select
          className="w-full rounded border p-2"
          value={type}
          onChange={(e) => setType(e.target.value as '신규' | '추가')}
        >
          <option value="신규">신규</option>
          <option value="추가">추가</option>
        </select>
        <input
          className="w-full rounded border p-2"
          placeholder="프로젝트 명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="기간"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <textarea
          className="w-full rounded border p-2"
          placeholder="내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="OS 종류"
          value={os}
          onChange={(e) => setOs(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="총 메모리"
          type="number"
          value={totalMemory}
          onChange={(e) => setTotalMemory(Number(e.target.value))}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="가용 메모리"
          type="number"
          value={availableMemory}
          onChange={(e) => setAvailableMemory(Number(e.target.value))}
        />
        <textarea
          className="w-full rounded border p-2"
          placeholder="프로젝트 요청 사항"
          value={requestDetail}
          onChange={(e) => setRequestDetail(e.target.value)}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit">등록</Button>
          <Button
            type="button"
            className="bg-gray-300 text-black"
            onClick={onClose}
          >
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
}
