"use client"

type Props = {
    value: string;
    onChange: (newValue: string) => void;
}

export default function PasswordInput({ value, onChange}: Props){
    return (
        <div>
        <label htmlFor="password">password</label>
        <input 
        id="password"
        type="text"
        placeholder="Password to generate the pairkeys"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-current border-2xl"
         />
         </div>
    );
}