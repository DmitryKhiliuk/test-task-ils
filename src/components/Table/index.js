import React from "react";
import { Table as TableAntd } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { routerActions } from "../../reducers/routerSlice";
import {
  requestListActions,
  requestListLoading,
  selectListRequests
} from "../../reducers/requestListSlice";

const Table = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const loading = useSelector(requestListLoading);
  const requests = useSelector(selectListRequests);

  React.useEffect(() => {
    dispatch(requestListActions.fetchRequestList());
  }, [dispatch]);

  const handleChange = (value, type, recordId) => {
    const newPoint = value.split(",").map((c) => +c);
    const findRequest = requests.find((r) => r.key === recordId);
    const newRoutePoints =
      type === "destination"
        ? {
            original: findRequest.original,
            destination: newPoint,
          }
        : {
            original: newPoint,
            destination: findRequest.destination,
          };

    dispatch(routerActions.fetchRoute(newRoutePoints));
  };

  const columns = [
    {
      title: "Номер заявки",
      dataIndex: "name",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "От lat",
      dataIndex: "original",
      render: (text, record) => {
        return (
          record.original[0]
        );
      },
    },
    {
      title: "От lng",
      dataIndex: "original",
      render: (text, record) => {
        return (
          record.original[1]
        );
      },
    },
    {
      title: "До lat",
      dataIndex: "destination",
      render: (text, record) => {
        return (
          record.destination[0]
        );
      }
    },
    {
      title: "До lng",
      dataIndex: "destination",
      render: (text, record) => {
        return (
          record.destination[1]
        );
      },
    },
  ];

  return (
    <TableAntd
      loading={loading}
      scroll={{ x: "max-content" }}
      onRow={(record, index) => {
        return {
          onClick: () => {
            dispatch(
              routerActions.fetchRoute({
                original: record.original,
                destination: record.destination,
              })
            );
            setSelectedRowKeys([index + ""]);
          },
        };
      }}
      rowSelection={{ selectedRowKeys }}
      columns={columns}
      dataSource={requests}
    ></TableAntd>
  );
};

export default Table;
