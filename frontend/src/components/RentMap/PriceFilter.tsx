import { FC, ReactElement } from 'react';
import { Checkbox } from 'antd'
import { getIconUrl } from '@u/util'
import { CheckboxGroupProps } from 'antd/lib/checkbox';

interface PriceFilterProps {
    filterCheckedList: number[];
    setFilterCheckedList: Function;
}

let options = [
    {
        label: '1000元以下',
        value: 1000,
        imgurl: getIconUrl('marker-gray.svg'),
    },
    {
        label: '1000-2000元',
        value: 2000,
        imgurl: getIconUrl('marker-blue.svg'),
    },
    {
        label: '2000-3000元',
        value: 3000,
        imgurl: getIconUrl('marker-green.svg'),
    },
    {
        label: '3000-4000元',
        value: 4000,
        imgurl: getIconUrl('marker-yellow.svg'),
    },
    {
        label: '4000元以上',
        value: 5000,
        imgurl: getIconUrl('marker-purple.svg'),
    },
]

const PriceFilter: FC<PriceFilterProps> = (props): ReactElement => {
    const {
        filterCheckedList,
        setFilterCheckedList,
    } = props

    const onChange: CheckboxGroupProps['onChange'] = (list) => {
        setFilterCheckedList(list)
    }

    return (
        <div className='price-filter'>
            <Checkbox.Group onChange={onChange} value={filterCheckedList}>
                {
                    options.map((e, index) =>
                        <Checkbox value={e.value} key={index} >
                            {e.label}
                            <img src={e.imgurl} />
                        </Checkbox>
                    )
                }
            </Checkbox.Group>
        </div>
    )
}

export default PriceFilter