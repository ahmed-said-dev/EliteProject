import React, { useMemo } from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import type { Category } from '../../types';

export interface CategoriesTreeProps {
  categories: Category[];
  selectedKeys?: string[];
  onSelect?: (ids: string[]) => void;
  onMove?: (dragId: string, dropParentId: string | null, sortOrder: number) => void;
}

function buildTree(categories: Category[]): DataNode[] {
  const map = new Map<string, DataNode>();
  categories.forEach((c) => {
    map.set(c.id, {
      key: c.id,
      title: c.name,
      children: [],
    });
  });
  const roots: DataNode[] = [];
  categories.forEach((c) => {
    const node = map.get(c.id)!;
    if (c.parentId && map.has(c.parentId)) {
      (map.get(c.parentId)!.children as DataNode[]).push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

const CategoriesTree: React.FC<CategoriesTreeProps> = ({ categories, selectedKeys, onSelect, onMove }) => {
  const treeData = useMemo(() => buildTree(categories), [categories]);

  const handleDrop: TreeProps['onDrop'] = (info) => {
    const dragId = String(info.dragNode.key);
    const dropParentId = info.node ? (String(info.node.key)) : null;
    const sortOrder = (info.dropPosition as number) || 0;
    onMove?.(dragId, dropParentId, sortOrder);
  };

  return (
    <Tree
      treeData={treeData}
      draggable
      blockNode
      selectedKeys={selectedKeys}
      onSelect={(keys) => onSelect?.(keys as string[])}
      onDrop={handleDrop}
    />
  );
};

export default CategoriesTree;









