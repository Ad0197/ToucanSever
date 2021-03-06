import { shallow } from "enzyme";
import CustomButton from "./custom-button.component";
import toJson from "enzyme-to-json";

describe("CustomButton components", () => {
  it("should show childrens", () => {
    const text = "TEST";
    const wrapper = shallow(<CustomButton>{text}</CustomButton>);
    expect(wrapper.text()).toBe(text);
  });

  it("should have a onClick Props", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<CustomButton onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("should have a rounded props by default true", () => {
    const wrapper = shallow(<CustomButton />);
    expect(wrapper.prop("rounded")).toBeTruthy();
  });

  it("should have a prop color by default primary", () => {
    const wrapper = shallow(<CustomButton />);
    expect(wrapper.prop("color")).toBe("primary");
  });

  it("should set color when you pass a color in", () => {
    const wrapper = shallow(<CustomButton color="dark" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
