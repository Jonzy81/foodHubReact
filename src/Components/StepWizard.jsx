import React from "react";

export default function StepWizard({ currentStep }) {
    const steps = ["Antal platser", "Datum", "Tid", "Dina uppgifter"];

    return (
        <div className="flex justify-center mb-6 pt-10">
            {steps.map((step, index) => {
                const isActive = currentStep === index + 1;
                const isCompleted = currentStep > index + 1;

                return (
                    <div key={index} className="flex items-center space-x-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                ${isCompleted ? "bg-emerald-600 text-white" :
                                    isActive ? "bg-blue-600 text-white" :
                                        "bg-gray-300 text-gray-700"}
              `}
                        >
                            {index + 1}
                        </div>
                        <span className={`text-sm ${isActive ? "font-semibold" : "text-gray-500"}`}>
                            {step}
                        </span>
                        {index !== steps.length - 1 && (
                            <div className="w-8 h-px bg-gray-400 mx-2"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
