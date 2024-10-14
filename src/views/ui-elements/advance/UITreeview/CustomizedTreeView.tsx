// material-ui
import { alpha, styled } from '@mui/material/styles';
import Collapse, { CollapseProps } from '@mui/material/Collapse';
import { TreeItem, SimpleTreeView } from '@mui/x-tree-view';
import { TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem';

// animation
function TransitionComponent(props: CollapseProps) {
    return <Collapse {...props} />;
}

// style constant
const StyledTreeItem = styled((props: TreeItemProps) => <TreeItem {...props} ContentComponent={TransitionComponent} />)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3
        }
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    }
}));

// ==============================|| UI TREEVIEW - CUSTOMIZED ||============================== //

export default function CustomizedTreeView() {
    return (
        <SimpleTreeView aria-label="customized" expandedItems={['1']}>
            <StyledTreeItem itemId="1" label="Main">
                <StyledTreeItem itemId="2" label="Hello" />
                <StyledTreeItem itemId="3" label="Subtree with children">
                    <StyledTreeItem itemId="6" label="Hello" />
                    <StyledTreeItem itemId="7" label="Sub-subtree with children">
                        <StyledTreeItem itemId="9" label="Child 1" />
                        <StyledTreeItem itemId="10" label="Child 2" />
                        <StyledTreeItem itemId="11" label="Child 3" />
                    </StyledTreeItem>
                    <StyledTreeItem itemId="8" label="Hello" />
                </StyledTreeItem>
                <StyledTreeItem itemId="4" label="World" />
                <StyledTreeItem itemId="5" label="Something something" />
            </StyledTreeItem>
        </SimpleTreeView>
    );
}
