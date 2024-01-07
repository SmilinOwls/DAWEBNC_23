import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { Button, List, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const DragHandle = SortableHandle(() => <span>::</span>);

const GradeCompositionItem = SortableElement(
  ({ item, index, editingId, handleDelete, handleEdit }) => (
    <List.Item
      className="w-full bg-white/10 flex items-center gap-2"
      key={`item-${index}`}
      actions={[
        <a onClick={() => handleEdit(item)}>
          {editingId === item._id ? (
            <Button type="dashed">Editing..</Button>
          ) : (
            <Button type="default">Edit</Button>
          )}
        </a>,
        <Popconfirm
          title="Are you sure to delete this grade structure?"
          onConfirm={() => handleDelete(item._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>
            <CloseOutlined />
          </Button>
        </Popconfirm>,
      ]}
    >
      <DragHandle />
      <List.Item.Meta
        className="flex-1"
        title={item.name}
        description={`Grade Weight: ${item.weight}%`}
      />
    </List.Item>
  )
);

const GradeCompositionList = SortableContainer(
  ({ items, editingId, handleEdit, handleDelete }) => {
    return (
      <List
        dataSource={items}
        renderItem={(item, index) => (
          <GradeCompositionItem
            key={`item-${index}`}
            index={index}
            editingId={editingId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            item={item}
          />
        )}
      />
    );
  }
);

export default GradeCompositionList;
