import { List, Image, Space, Divider } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import Address from "./Address";
import Token from "C:/pr0/scaffold-eth/packages/react-app/src/SBTPicture.png";
import Blockies from "react-blockies";


/**
  ~ What it does? ~

  Displays a lists of events

  ~ How can I use? ~

  <Events
    contracts={readContracts}
    contractName="YourContract"
    eventName="SetPurpose"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
**/

export default function Mints({ contracts, contractName, localProvider, mainnetProvider, startBlock }) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, "Mints", localProvider, startBlock);

  return (
    <div>
      <List
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber}>
              <Space size={20} split={<Divider type="vertical" />}>
              <Blockies seed={item.args[0].toLowerCase()}size={20}scale={2}/>
              <Image src={Token} preview={false}height={40}width={40}/>
              </Space>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
