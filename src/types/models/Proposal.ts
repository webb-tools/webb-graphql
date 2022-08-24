// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    ProposalType,
} from '../enums'


type ProposalProps = Omit<Proposal, NonNullable<FunctionPropertyNames<Proposal>>>;

export class Proposal implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public proposalId: string;

    public type: ProposalType;

    public data: string;

    public signature?: string;

    public blockId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Proposal entity without an ID");
        await store.set('Proposal', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Proposal entity without an ID");
        await store.remove('Proposal', id.toString());
    }

    static async get(id:string): Promise<Proposal | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Proposal entity without an ID");
        const record = await store.get('Proposal', id.toString());
        if (record){
            return Proposal.create(record as ProposalProps);
        }else{
            return;
        }
    }


    static async getByProposalId(proposalId: string): Promise<Proposal[] | undefined>{
      
      const records = await store.getByField('Proposal', 'proposalId', proposalId);
      return records.map(record => Proposal.create(record as ProposalProps));
      
    }

    static async getByBlockId(blockId: string): Promise<Proposal[] | undefined>{
      
      const records = await store.getByField('Proposal', 'blockId', blockId);
      return records.map(record => Proposal.create(record as ProposalProps));
      
    }


    static create(record: ProposalProps): Proposal {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Proposal(record.id);
        Object.assign(entity,record);
        return entity;
    }
}