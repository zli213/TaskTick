import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useDismissToast = () => {
  const dispatch = useDispatch();
  const toastIds = useSelector((state) => state.toastIds.toastIds);

  useEffect(() => {
    return () => {
      if (toastIds.length !== 0) {
        const latestToastId = toastIds[toastIds.length - 1];
        toast.dismiss(latestToastId);
      }
    };
  }, [toastIds, dispatch]);
};
export default useDismissToast;
