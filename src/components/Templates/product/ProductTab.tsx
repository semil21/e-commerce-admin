import { useState, useEffect, useRef } from "react";
import AddNewProductTab from "./AddProduct";

const AddProductTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    transform: "translateX(0px)",
  });
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    updateIndicator(index);
  };

  const updateIndicator = (index: number) => {
    const tabs = tabsRef.current?.children;
    if (tabs && tabs[index]) {
      const element = tabs[index] as HTMLElement;
      setIndicatorStyle({
        width: element.offsetWidth,
        transform: `translateX(${element.offsetLeft}px)`,
      });
    }
  };

  useEffect(() => {
    updateIndicator(0);
  }, []);

  return (
    <div className="mt-8 ">
      <header className="relative text-center flex justify-center">
        <nav
          ref={tabsRef}
          className="inline-flex justify-center bg-white shadow"
        >
          <button
            onClick={() => handleTabClick(0)}
            className={`inline-flex text-[16px] font-bold items-center justify-center px-8 py-4 text-sm font-medium w-[200px] overflow-hidden   transition ${
              activeTab === 0 ? "text-indigo-600" : "text-gray-600"
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => handleTabClick(1)}
            className={`inline-flex items-center justify-center px-8 py-4 text-sm font-medium w-[200px] text-[16px] font-bold transition ${
              activeTab === 1 ? "text-indigo-600" : "text-gray-600"
            }`}
          >
            Symptoms
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`inline-flex items-center justify-center px-8 py-4 text-sm font-medium w-[200px]  text-[16px] font-bold transition ${
              activeTab === 2 ? "text-indigo-600" : "text-gray-600"
            }`}
          >
            Safety checklist
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`inline-flex items-center justify-center px-8 py-4 text-sm font-medium w-[200px] text-[16px] font-boldtransition ${
              activeTab === 3 ? "text-indigo-600" : "text-gray-600"
            }`}
          >
            Local regulations
          </button>
        </nav>
        <div
          className="border-t-2 border-indigo-600 absolute left-0 bottom-0 transition-all duration-500"
          style={indicatorStyle}
        ></div>
      </header>

      <div className="tab-content mt-4">
        {activeTab === 0 && <AddNewProductTab />}
        {activeTab === 1 && <SymptomsTab />}
        {activeTab === 2 && <SafetyChecklistTab />}
        {activeTab === 3 && <LocalRegulationsTab />}
      </div>
    </div>
  );
};

const SymptomsTab = () => <div>Symptoms content here</div>;
const SafetyChecklistTab = () => <div>Safety checklist content here</div>;
const LocalRegulationsTab = () => <div>Local regulations content here</div>;

export default AddProductTab;
