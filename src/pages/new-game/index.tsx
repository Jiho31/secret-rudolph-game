import { useMemo, useState } from "react";

type Props = {};
type ItemsFormProps = {
  step: number;
};

function ItemsForm({ step }: ItemsFormProps) {
  if (step === 1) {
    return <div>step1</div>;
  } else if (step === 2) {
    return <div>step2</div>;
  } else {
    return <div>Selected items: </div>;
  }
}

export default function NewGame({}: Props) {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const isLastStep = useMemo(() => currentStep === totalSteps, [currentStep]);
  const [itemOptions, setItemOptions] = useState([]);
  const [selectedLikes, setSelectedLikes] = useState([]);
  const [selectedDislikes, setSelectedDislikes] = useState([]);

  const handleNextClick = (val: number) => {
    if (isLastStep && val > 0) {
      // @todo create game
      console.log("create game");
    } else {
      setCurrentStep((prev) => prev + val);
    }
  };

  return (
    <section className="flex flex-col justify-center gap-5 w-[500px] h-dvh mx-auto ">
      <h1>
        If Santa were to get you presents, what would you like or dislike for
        Christmas?
      </h1>
      <h2>
        Step {currentStep} / {totalSteps}
      </h2>

      <div>
        <ItemsForm step={currentStep} />
      </div>

      <button
        className="p-3 rounded-xl bg-green-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-green-900"
        disabled={currentStep <= 1}
        onClick={() => handleNextClick(-1)}
      >
        Prev
      </button>

      <button
        className="p-3 rounded-xl bg-green-700 hover:cursor-pointer"
        onClick={() => handleNextClick(1)}
      >
        {isLastStep ? "Create game" : "Next"}
      </button>
    </section>
  );
}
