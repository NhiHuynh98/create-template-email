import { Input } from "antd";
import React, { useCallback, useState } from "react"
import { CheckOutlined } from "@ant-design/icons";

const TextEditable = ({ value, subKey = 0, setEditable }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [field, setField] = useState<string>("Condition")

    const handleDoubleClick = () => {
        setIsEditing(true)
    };

    const handeChange = useCallback((e) => {
        setField(e.target.value)
    }, [])

    return (
        <div onDoubleClick={handleDoubleClick}>
            {isEditing ? (
            <Input
                type="text"
                onChange={handeChange}
                value={field}
                autoFocus
                suffix={<CheckOutlined onClick={() => {
                    setEditable({ subKey, field })
                    setIsEditing(false)
                }}/>}
            />
            ) : (
            <span>{field}</span>
            )}
        </div>
    )
}

export default TextEditable