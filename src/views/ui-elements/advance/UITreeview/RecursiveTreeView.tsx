import { TreeItem, SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem, SimpleTreeView } from '@mui/x-tree-view';

interface RTVChildrenProps {
    id: string;
    name: string;
    children?: RTVChildrenProps[];
}

const data: any = {
    id: 'root',
    name: 'Parent',
    children: [
        {
            id: '1',
            name: 'Child - 1'
        },
        {
            id: '3',
            name: 'Child - 3',
            children: [
                {
                    id: '4',
                    name: 'Child - 4'
                }
            ]
        }
    ]
};

// ==============================|| UI TREEVIEW ||============================== //

export default function RecursiveTreeView() {
    const renderTree = (nodes: RTVChildrenProps) => (
        <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.name}>
        <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    return <SimpleTreeView defaultExpandedItems={['root']}>{renderTree(data)}</SimpleTreeView>;
}
