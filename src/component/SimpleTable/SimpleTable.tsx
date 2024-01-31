import SingleArrowLeft from "assets/img/ArrowLeftSmall.svg";
import SingleArrowRight from "assets/img/ArrowRightSmall.svg";
import DoubleArrowLeft from "assets/img/Arrowdouble.svg";
import DoubleArrowRight from "assets/img/Arrowdoubleright.svg";
// import ErrorChartTable from "components/ErrorChartTable/ErrorChartTable";
// import NoDataChartTable from "components/NoDataChartTable/NoDataChartTable";
// import SimpleDropDown from "components/SimpleDropDown/SimpleDropDown";
import { DataTable, DataTableProps } from "primereact/datatable";
import { classNames } from "primereact/utils";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { parseStandardAPIErrorMessage } from "util/CommonUtil";

export const Column = (props: any) => {
  return <React.Fragment />;
};

interface ITableData extends DataTableProps {
  [key: string]: any;
  advanceSearch?: object;
  search?: string;
  standardDataFormatPromise?: any;
  tableObj?: {
    limit?: number;
    loading?: boolean;
    totalRecords?: number;
    start?: number;
    records?: any[];
    search?: string;
    page?: number;
  };
  isIgnoreInitialLoad?: boolean;
  onUpdateCallback?: () => void;
}
export interface SimpleTableRef {
  search: (e?: any) => void;
  getTotalRecordsCount: () => void;
  tableStatus: {
    limit?: number;
    loading?: boolean;
    totalRecords?: number;
    start?: number;
    records?: any[];
    search?: string;
    page?: number;
  };
  loadingState: boolean;
}
const SimpleTable = forwardRef<SimpleTableRef, ITableData>((props, ref) => {
  const {
    standardDataFormatPromise,
    search,
    advanceSearch,
    isIgnoreInitialLoad,
    onUpdateCallback,
    ...primeReactProps
  } = props;
  //  set this state based on requirement, if we want to use page wise pagination then set it true otherwise false
  const isPageWisePagination = true;
  const isOffSetStartWithZero = true;
  const [dataTable, setDataTable] = useState({
    limit: props.tableObj?.limit ?? 10,
    loading: props.tableObj?.loading ?? true,
    totalRecords: props.tableObj?.totalRecords ?? 0,
    start: props.tableObj?.start ?? 0,
    records: [] as any[],
    search: props.search ?? "",
    page: props.tableObj?.page ?? 0,
    errorMessage: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  const [startOffset] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  /*
  --------------------
  Hooks
  --------------------
  */
  useEffect(() => {
    if (standardDataFormatPromise && !isIgnoreInitialLoad) {
      prepareParamAndCallPromise(null);
      setIsInitialLoad(true);
    }
  }, []);
  useEffect(() => {
    if (onUpdateCallback) {
      onUpdateCallback();
    }
  }, [dataTable]);

  useImperativeHandle(ref, () => ({
    search: searchFn,
    getTotalRecordsCount: getTotalRecordsCount,
    loadingState: dataTable.loading,
    tableStatus: dataTable,
  }));

  const searchFn = (e: any) => {
    if (isInitialLoad) {
      prepareParamAndCallPromise(e);
    }
  };

  const prepareParamAndCallPromise = (e: any) => {
    if (!props.standardDataFormatPromise) {
      return;
    }
    setDataTable({
      ...dataTable,
      records: [],
      loading: true,
    });
    const searchParams = {
      start: props.rows ? props.start : dataTable.start,
      limit: props.rows ? props.rows : dataTable.limit,
      search: "",
      page: isOffSetStartWithZero ? 0 : 1,
    };

    if (e) {
      const page = e.page ? e.page : 0;
      const rows = e.rows ? e.rows : 0;
      // calculate the first record to fetch
      let first = page * rows;
      first = first + startOffset;

      searchParams.start = first;
      searchParams.page = page;
    } else {
      searchParams.page = currentPage;
    }

    if (props.search) {
      searchParams.search = search ?? "";
    }

    if (advanceSearch) {
      const payload = {
        ...advanceSearch,
        page: isPageWisePagination ? searchParams.page : searchParams.start,
        limit: searchParams.limit,
      };
      return props
        .standardDataFormatPromise(payload)
        .then((res: any) => {
          if (res.data) {
            if (res.data.results.length > 0 && res.data.total) {
              const modifiedTotal: { [key: string]: any } = { month: "Total" };
              const lastResult = res.data.results[res.data.results.length - 1];

              for (const key in res.data.total) {
                if (Object.prototype.hasOwnProperty.call(lastResult, key)) {
                  modifiedTotal[key] = res.data.total[key];
                } else if (Object.prototype.hasOwnProperty.call(res.data.total, key)) {
                  const modifiedKey =
                    key === "distance"
                      ? "milesDriven"
                      : key.substring(5, 6).toLowerCase() + key.substring(6);
                  modifiedTotal[modifiedKey] = res.data.total[key];
                }
              }
              res.data.results.push(modifiedTotal);
            }

            setDataTable({
              ...dataTable,
              loading: false,
              records: res.data.results,
              totalRecords: res.data.size,
              start: searchParams.start,
              search: searchParams.search,
            });
            setCurrentPage(searchParams.page);
          }
        })
        .catch((err: any) => {
          setDataTable({
            ...dataTable,
            loading: false,
            records: [],
            totalRecords: 0,
            start: searchParams.start,
            search: searchParams.search,
            errorMessage: parseStandardAPIErrorMessage(err),
          });
        });
    }
    return props
      .standardDataFormatPromise(
        isPageWisePagination ? searchParams.page : searchParams.start,
        searchParams.limit,
        searchParams.search
      )
      .then((res: any) => {
        if (res.data) {
          if (res.data.results.length > 0 && res.data.total) {
            const modifiedTotal: { [key: string]: any } = { month: "Total" };
            const lastResult = res.data.results[res.data.results.length - 1];

            for (const key in res.data.total) {
              if (Object.prototype.hasOwnProperty.call(lastResult, key)) {
                modifiedTotal[key] = res.data.total[key];
              } else if (Object.prototype.hasOwnProperty.call(res.data.total, key)) {
                const modifiedKey =
                  key === "distance"
                    ? "milesDriven"
                    : key.substring(5, 6).toLowerCase() + key.substring(6);
                modifiedTotal[modifiedKey] = res.data.total[key];
              }
            }
            res.data.results.push(modifiedTotal);
          }

          setDataTable({
            ...dataTable,
            loading: false,
            records: res.data.results,
            totalRecords: res.data.size,
            start: searchParams.start,
            search: searchParams.search,
          });
          setCurrentPage(searchParams.page);
        }
      })
      .catch((err: any) => {
        setDataTable({
          ...dataTable,
          loading: false,
          records: [],
          totalRecords: 0,
          start: searchParams.start,
          search: searchParams.search,
          errorMessage: parseStandardAPIErrorMessage(err),
        });
      });
  };

  const rowClass = (data: any) => {
    return data?.uid ? { "row-highlight": data.uid % 2 } : "";
  };

  const emptyMessageRender = () => {
    const { errorMessage } = dataTable;

    return (
      <div className="empty-message-table absolute left-0 top-0 flex w-full flex-col items-center justify-center bg-neutral-800">
        <div className="text-inputBorderColour pt-3 text-sm font-medium">
          {errorMessage ? (
            <div className="ml-4 mt-7 flex justify-center">
              {/* <ErrorChartTable /> */}
              Error
            </div>
          ) : (
            props.emptymessage ?? (
              <>
                {/* <NoDataChartTable /> */}
                No Data
              </>
            )
          )}
        </div>
      </div>
    );
  };

  const onChange = (e: any) => {
    setDataTable({
      ...dataTable,
      limit: e.value,
    });
  };
  const getTotalRecordsCount = () => {
    return dataTable.totalRecords;
  };

  // Pagination component for the table to override the icons
  const renderPaginator = () => {
    return {
      layout:
        "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink  LastPageLink RowsPerPageDropdown",
      FirstPageLink: (options: any) => {
        return (
          <button
            type="button"
            className={`${options.className} mr-4 cursor-pointer  rounded-full  `}
            onClick={options.onClick}
            disabled={options.disabled}
          >
            <span className="p-3 ">
              <img src={DoubleArrowLeft} alt="search-icon" className=" w-3" />
            </span>
          </button>
        );
      },
      LastPageLink: (options: any) => {
        return (
          <button
            type="button"
            className={`${options.className} mr-4 cursor-pointer rounded-full hover:border hover:border-solid hover:bg-primary-green-700  `}
            onClick={options.onClick}
            disabled={options.disabled}
          >
            <span className="p-3 ">
              <img src={DoubleArrowRight} alt="search-icon" className=" w-3" />
            </span>
          </button>
        );
      },
      PrevPageLink: (options: any) => {
        return (
          <button
            type="button"
            className={`${options.className} mr-4 cursor-pointer rounded-full border hover:border hover:border-solid hover:bg-primary-green-700  `}
            onClick={options.onClick}
            disabled={options.disabled}
          >
            <span className="p-3 ">
              <img src={SingleArrowLeft} alt="search-icon" className=" w-3" />
            </span>
          </button>
        );
      },
      NextPageLink: (options: any) => {
        return (
          <button
            type="button"
            className={`${options.className} ml-4 cursor-pointer rounded-full hover:border hover:border-solid hover:bg-primary-green-700`}
            onClick={options.onClick}
            disabled={options.disabled}
          >
            <span className="p-3">
              <img src={SingleArrowRight} alt="search-icon" className=" w-3" />
            </span>
          </button>
        );
      },
      PageLinks: (options: any) => {
        if (
          (options.view.startPage === options.page && options.view.startPage !== 0) ||
          (options.view.endPage === options.page && options.page + 1 !== options.totalPages)
        ) {
          const className = classNames(options.className, {
            "p-disabled": true,
          });

          return (
            <span className={className} style={{ userSelect: "none" }}>
              ...
            </span>
          );
        }
        return (
          <button
            type="button"
            className={` ${options.className} h-8 w-8 rounded-full text-neutral-200`}
            onClick={options.onClick}
          >
            {options.page + 1}
          </button>
        );
      },
      CurrentPageReport: (options: any) => {
        return (
          <span className="text-sm text-neutral-200">
            Showing {options.first} to {options.last} of {options.totalRecords}
          </span>
        );
      },
      RowsPerPageDropdown: (options: any) => {
        const dropdownOptions = [
          { label: 10, value: 10 },
          { label: 20, value: 20 },
          { label: 50, value: 50 },
        ];
        return (
          <div className="ml-10 flex w-20 flex-row">
            Dropdown
            {/* <SimpleDropDown value={options.value} options={dropdownOptions} onChange={onChange} /> */}
          </div>
        );
      },
    };
  };

  const { loading, records, limit, start, totalRecords, errorMessage } = dataTable;

  if (errorMessage) {
    return (
      <div className="flex h-60 w-full items-center justify-center rounded-xl bg-neutral-800">
        {/* <ErrorChartTable /> */}
        Error
      </div>
    );
  } else if (props.emptymessage) {
    return (
      <div className="flex h-60 w-full items-center justify-center rounded-xl bg-neutral-800">
        {/* <NoDataChartTable /> */}
        No Data
      </div>
    );
  } else {
    return (
      <DataTable
        breakpoint="768px"
        className={`rounded-xl px-0 ${primeReactProps.className ? primeReactProps.className : ""}`}
        dataKey={primeReactProps.dataKey}
        emptyMessage={emptyMessageRender}
        first={start}
        lazy
        loading={loading}
        onPage={searchFn}
        paginator={primeReactProps.paginator ?? false}
        paginatorTemplate={renderPaginator()}
        responsiveLayout="scroll"
        rowClassName={rowClass}
        rows={limit}
        scrollHeight="548px"
        stripedRows
        totalRecords={totalRecords}
        value={records}
        {...primeReactProps}
      >
        {props.children}
      </DataTable>
    );
  }
});

export default SimpleTable;
