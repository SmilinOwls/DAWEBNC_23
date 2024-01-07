import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Form, message, InputNumber } from "antd";
import gradeApi from "../../../../Services/gradeApi";
import { arrayMoveImmutable } from "array-move";
import GradeCompositionList from "./Components/GradeCompositionList";

const GradeStructure = ({ classId }) => {
  const [form] = Form.useForm();
  const [gradeStructures, setGradeStructures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGradeStructures();
  }, []);

  const getOriginWeight = (data) => {
    const weight = data.reduce((acc, cur) => {
      if (cur._id == editingId) return acc;
      return acc + cur.weight;
    }, 0);

    return weight;
  };

  const fetchGradeStructures = async () => {
    setLoading(true);
    try {
      const res = await gradeApi.getGradeStructures(classId);
      const data = res.data;
      setGradeStructures(data);
      setTotalWeight(getOriginWeight(data));
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      if (editingId) {
        await gradeApi.updateGradeStructureById(classId, editingId, values);
        setEditingId(null);
      } else await gradeApi.createGradeStructure(classId, values);

      message.success("Successfully saved the grade structure");
      await fetchGradeStructures();
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  const handleEdit = (gradeComposition) => {
    setTotalWeight(getOriginWeight(gradeStructures));
    setEditingId(gradeComposition._id);
    form.setFieldsValue(gradeComposition);
  };

  const handleDelete = (id) => {
    setLoading(true);
    gradeApi
      .deleteGradeStructure(classId, id)
      .then((res) => {
        message.success("Successfully deleted the grade structure");
        fetchGradeStructures();
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setLoading(false);
      });
  };

  const onWeightChanged = (value) => {
    const originWeight = getOriginWeight(gradeStructures);
    console.log(originWeight);
    setTotalWeight(originWeight + value);
  };

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    const newGradeStructures = arrayMoveImmutable(
      gradeStructures,
      oldIndex,
      newIndex
    );
    setGradeStructures(newGradeStructures);
    await gradeApi.updateGradeStructures(classId, newGradeStructures);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2 className="text-center">Grade Structure</h2>
      <p className="text-center text-zinc-400">
        Grade structure is used to calculate the final grade of the student. The
        total sum must be exactly 100%
      </p>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item label="Grade Name" name="name">
          <Input placeholder="Enter grade name" />
        </Form.Item>
        <Form.Item label="Grade Weight (%)" name="weight">
          <InputNumber
            min={0}
            placeholder="Enter grade weight"
            onChange={onWeightChanged}
          />
        </Form.Item>
        <div>
          <Button
            type="default"
            className="mr-2"
            onClick={() => {
              setEditingId(null);
              form.resetFields();
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            disabled={!editingId && totalWeight > 100}
            loading={loading}
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </Form>
      <div className="mt-4 text-sm text-black/40">
        The remaining percent: {100 - totalWeight}%
      </div>
      <hr />

      <GradeCompositionList
        items={gradeStructures}
        editingId={editingId}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        onSortEnd={onSortEnd}
      />
    </div>
  );
};

export default GradeStructure;
