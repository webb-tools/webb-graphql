import {
  GetVAnchorTotalValueLockedByChain,
  GetVAnchorTotalValueLockedByChains,
  GetVAnchorsTotalValueLockedByChain,
  GetVAnchorsTotalValueLockedByChains,
  GetVAnchorTotalValueLockedByChainAndByToken,
  GetVAnchorTotalValueLockedByChainsAndByToken,
  GetVAnchorTotalValueLockedByChain15MinsInterval,
  GetVAnchorTotalValueLockedByChains15MinsInterval,
  GetVAnchorsTotalValueLockedByChain15MinsInterval,
  GetVAnchorsTotalValueLockedByChains15MinsInterval,
  GetVAnchorTotalValueLockedByChainAndByToken15MinsInterval,
  GetVAnchorTotalValueLockedByChainsAndByToken15MinsInterval,
  GetVAnchorTotalValueLockedByChainByDay,
  GetVAnchorTotalValueLockedByChainsByDay,
  GetVAnchorsTotalValueLockedByChainByDay,
  GetVAnchorsTotalValueLockedByChainsByDay,
  GetVAnchorTotalValueLockedByChainAndByTokenByDay,
  GetVAnchorTotalValueLockedByChainsAndByTokenByDay,
  GetVAnchorsTVLByChainByDateRange,
  GetVAnchorsTVLByChainsByDateRange,
} from './queries/tvl';
import {
  GetVAnchorDepositByChain,
  GetVAnchorDepositByChains,
  GetVAnchorsDepositByChain,
  GetVAnchorsDepositByChains,
  GetVAnchorDepositByChainAndByToken,
  GetVAnchorDepositByChainsAndByToken,
  GetVAnchorDepositByChain15MinsInterval,
  GetVAnchorDepositByChains15MinsInterval,
  GetVAnchorsDepositByChain15MinsInterval,
  GetVAnchorsDepositByChains15MinsInterval,
  GetVAnchorDepositByChainAndByToken15MinsInterval,
  GetVAnchorDepositByChainsAndByToken15MinsInterval,
  GetVAnchorDepositByChainDayInterval,
  GetVAnchorDepositByChainsDayInterval,
  GetVAnchorsDepositByChainDayInterval,
  GetVAnchorsDepositByChainsDayInterval,
  GetVAnchorDepositByChainAndByTokenDayInterval,
  GetVAnchorDepositByChainsAndByTokenDayInterval,
  GetVAnchorsDepositByChainByDateRange,
  GetVAnchorsDepositByChainsByDateRange,
} from './queries/deposit';
import {
  GetVAnchorWithdrawalByChain,
  GetVAnchorWithdrawalByChains,
  GetVAnchorsWithdrawalByChain,
  GetVAnchorsWithdrawalByChains,
  GetVAnchorWithdrawalByChainAndByToken,
  GetVAnchorWithdrawalByChainsAndByToken,
  GetVAnchorWithdrawalByChain15MinsInterval,
  GetVAnchorWithdrawalByChains15MinsInterval,
  GetVAnchorsWithdrawalByChain15MinsInterval,
  GetVAnchorsWithdrawalByChains15MinsInterval,
  GetVAnchorWithdrawalByChainAndByToken15MinsInterval,
  GetVAnchorWithdrawalByChainsAndByToken15MinsInterval,
} from './queries/withdrawal';
import {
  GetVAnchorVolumeByChain,
  GetVAnchorVolumeByChains,
  GetVAnchorsVolumeByChain,
  GetVAnchorsVolumeByChains,
  GetVAnchorVolumeByChainAndByToken,
  GetVAnchorVolumeByChainsAndByToken,
  GetVAnchorVolumeByChain15MinsInterval,
  GetVAnchorVolumeByChains15MinsInterval,
  GetVAnchorsVolumeByChain15MinsInterval,
  GetVAnchorsVolumeByChains15MinsInterval,
  GetVAnchorVolumeByChainAndByToken15MinsInterval,
  GetVAnchorVolumeByChainsAndByToken15MinsInterval,
  GetVAnchorVolumeByChainDayInterval,
  GetVAnchorVolumeByChainsDayInterval,
  GetVAnchorsVolumeByChainDayInterval,
  GetVAnchorsVolumeByChainsDayInterval,
  GetVAnchorVolumeByChainAndByTokenDayInterval,
  GetVAnchorVolumeByChainsAndByTokenDayInterval,
  GetVAnchorsVolumeByChainByDateRange,
  GetVAnchorsVolumeByChainsByDateRange,
} from './queries/volume';
import {
  GetVAnchorTotalRelayerFeeByChain,
  GetVAnchorTotalRelayerFeeByChainAndByToken,
  GetVAnchorsTotalRelayerFeeByChain,
  GetVAnchorsTotalRelayerFeeByChains,
  GetVAnchorRelayerFeeByChain15MinsInterval,
  GetVAnchorRelayerFeeByChainAndByToken15MinsInterval,
  GetVAnchorsRelayerFeeByChain15MinsInterval,
  GetVAnchorsRelayerFeeByChains15MinsInterval,
} from './queries/relayerFee';
import {
  GetVAnchorTotalWrappingFeeByChain,
  GetVAnchorTotalWrappingFeeByChainAndByToken,
  GetVAnchorsTotalWrappingFeeByChain,
  GetVAnchorsTotalWrappingFeeByChains,
  GetVAnchorWrappingFeeByChain15MinsInterval,
  GetVAnchorWrappingFeeByChainAndByToken15MinsInterval,
  GetVAnchorsWrappingFeeByChain15MinsInterval,
  GetVAnchorsWrappingFeeByChains15MinsInterval,
} from './queries/wrappingFee';
import { SubgraphUrl } from './config';

const vAnchorClient = {
  SubgraphUrl,
  RelayerFee: {
    GetVAnchorTotalRelayerFeeByChain,
    GetVAnchorTotalRelayerFeeByChainAndByToken,
    GetVAnchorsTotalRelayerFeeByChain,
    GetVAnchorsTotalRelayerFeeByChains,
    GetVAnchorRelayerFeeByChain15MinsInterval,
    GetVAnchorRelayerFeeByChainAndByToken15MinsInterval,
    GetVAnchorsRelayerFeeByChain15MinsInterval,
    GetVAnchorsRelayerFeeByChains15MinsInterval,
  },
  WrappingFee: {
    GetVAnchorTotalWrappingFeeByChain,
    GetVAnchorTotalWrappingFeeByChainAndByToken,
    GetVAnchorsTotalWrappingFeeByChain,
    GetVAnchorsTotalWrappingFeeByChains,
    GetVAnchorWrappingFeeByChain15MinsInterval,
    GetVAnchorWrappingFeeByChainAndByToken15MinsInterval,
    GetVAnchorsWrappingFeeByChain15MinsInterval,
    GetVAnchorsWrappingFeeByChains15MinsInterval,
  },
  Deposit: {
    GetVAnchorDepositByChain,
    GetVAnchorDepositByChains,
    GetVAnchorsDepositByChain,
    GetVAnchorsDepositByChains,
    GetVAnchorDepositByChainAndByToken,
    GetVAnchorDepositByChainsAndByToken,
    GetVAnchorDepositByChain15MinsInterval,
    GetVAnchorDepositByChains15MinsInterval,
    GetVAnchorsDepositByChain15MinsInterval,
    GetVAnchorsDepositByChains15MinsInterval,
    GetVAnchorDepositByChainAndByToken15MinsInterval,
    GetVAnchorDepositByChainsAndByToken15MinsInterval,
    GetVAnchorDepositByChainDayInterval,
    GetVAnchorDepositByChainsDayInterval,
    GetVAnchorsDepositByChainDayInterval,
    GetVAnchorsDepositByChainsDayInterval,
    GetVAnchorDepositByChainAndByTokenDayInterval,
    GetVAnchorDepositByChainsAndByTokenDayInterval,
    GetVAnchorsDepositByChainByDateRange,
    GetVAnchorsDepositByChainsByDateRange,
  },
  Withdrawal: {
    GetVAnchorWithdrawalByChain,
    GetVAnchorWithdrawalByChains,
    GetVAnchorsWithdrawalByChain,
    GetVAnchorsWithdrawalByChains,
    GetVAnchorWithdrawalByChainAndByToken,
    GetVAnchorWithdrawalByChainsAndByToken,
    GetVAnchorWithdrawalByChain15MinsInterval,
    GetVAnchorWithdrawalByChains15MinsInterval,
    GetVAnchorsWithdrawalByChain15MinsInterval,
    GetVAnchorsWithdrawalByChains15MinsInterval,
    GetVAnchorWithdrawalByChainAndByToken15MinsInterval,
    GetVAnchorWithdrawalByChainsAndByToken15MinsInterval,
  },
  TotalValueLocked: {
    GetVAnchorTotalValueLockedByChain,
    GetVAnchorTotalValueLockedByChains,
    GetVAnchorsTotalValueLockedByChain,
    GetVAnchorsTotalValueLockedByChains,
    GetVAnchorTotalValueLockedByChainAndByToken,
    GetVAnchorTotalValueLockedByChainsAndByToken,
    GetVAnchorTotalValueLockedByChain15MinsInterval,
    GetVAnchorTotalValueLockedByChains15MinsInterval,
    GetVAnchorsTotalValueLockedByChain15MinsInterval,
    GetVAnchorsTotalValueLockedByChains15MinsInterval,
    GetVAnchorTotalValueLockedByChainAndByToken15MinsInterval,
    GetVAnchorTotalValueLockedByChainsAndByToken15MinsInterval,
    GetVAnchorTotalValueLockedByChainByDay,
    GetVAnchorTotalValueLockedByChainsByDay,
    GetVAnchorsTotalValueLockedByChainByDay,
    GetVAnchorsTotalValueLockedByChainsByDay,
    GetVAnchorTotalValueLockedByChainAndByTokenByDay,
    GetVAnchorTotalValueLockedByChainsAndByTokenByDay,
    GetVAnchorsTVLByChainByDateRange,
    GetVAnchorsTVLByChainsByDateRange,
  },
  Volume: {
    GetVAnchorVolumeByChain,
    GetVAnchorVolumeByChains,
    GetVAnchorsVolumeByChain,
    GetVAnchorsVolumeByChains,
    GetVAnchorVolumeByChainAndByToken,
    GetVAnchorVolumeByChainsAndByToken,
    GetVAnchorVolumeByChain15MinsInterval,
    GetVAnchorVolumeByChains15MinsInterval,
    GetVAnchorsVolumeByChain15MinsInterval,
    GetVAnchorsVolumeByChains15MinsInterval,
    GetVAnchorVolumeByChainAndByToken15MinsInterval,
    GetVAnchorVolumeByChainsAndByToken15MinsInterval,
    GetVAnchorVolumeByChainDayInterval,
    GetVAnchorVolumeByChainsDayInterval,
    GetVAnchorsVolumeByChainDayInterval,
    GetVAnchorsVolumeByChainsDayInterval,
    GetVAnchorVolumeByChainAndByTokenDayInterval,
    GetVAnchorVolumeByChainsAndByTokenDayInterval,
    GetVAnchorsVolumeByChainByDateRange,
    GetVAnchorsVolumeByChainsByDateRange,
  },
};

export default vAnchorClient;
