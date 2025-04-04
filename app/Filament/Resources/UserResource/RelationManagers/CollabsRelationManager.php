<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use App\Models\Collab;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class CollabsRelationManager extends RelationManager
{
    protected static string $relationship = 'createdCollabs';

    protected static ?string $recordTitleAttribute = 'subject';

    protected function getTableQuery(): Builder
    {
        return Collab::where(function ($query) {
            $query->where('creator_id', $this->ownerRecord->id)
                  ->orWhere('partner_id', $this->ownerRecord->id);
        });
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('subject')
                    ->required()
                    ->maxLength(255)
                    ->label('Subject'),
                
                Forms\Components\Textarea::make('description')
                    ->required()
                    ->maxLength(1000)
                    ->label('Description'),
                
                Forms\Components\Select::make('type')
                    ->options([
                        'study' => 'Study',
                        'project' => 'Project',
                        'research' => 'Research',
                    ])
                    ->required()
                    ->label('Type'),
                
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ])
                    ->required()
                    ->label('Status'),
                
                Forms\Components\Select::make('partner_id')
                    ->options(User::where('id', '!=', $this->ownerRecord->id)->pluck('name', 'id'))
                    ->searchable()
                    ->label('Partner'),
                
                Forms\Components\Textarea::make('comment')
                    ->maxLength(1000)
                    ->label('Comment'),
                
                Forms\Components\Textarea::make('review')
                    ->maxLength(1000)
                    ->label('Review'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('subject')
            ->columns([
                TextColumn::make('subject')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('description')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'study' => 'info',
                        'project' => 'success',
                        'research' => 'warning',
                        default => 'gray',
                    }),
                BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'accepted',
                        'danger' => 'rejected',
                    ]),
                TextColumn::make('creator.name')
                    ->label('Creator')
                    ->searchable(),
                TextColumn::make('partner.name')
                    ->label('Partner')
                    ->searchable(),
                TextColumn::make('comment')
                    ->limit(30)
                    ->searchable(),
                TextColumn::make('review')
                    ->limit(30)
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'study' => 'Study',
                        'project' => 'Project',
                        'research' => 'Research',
                    ]),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ]),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->mutateFormDataUsing(function (array $data): array {
                        $data['creator_id'] = $this->ownerRecord->id;
                        return $data;
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
} 