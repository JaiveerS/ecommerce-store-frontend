
export default function FormInput(props) {
    const {label, onChange, errorMessage, ...inputProps} = props;
    return(
        <div >
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input {...inputProps} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
            <span className="text-red-600 font-thin text-sm pl-1 pt-2" hidden={true}>{errorMessage}</span>
        </div>
    )
}